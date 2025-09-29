import chalk from 'chalk';
import ora from 'ora';
import { VaultManager } from '../lib/vault';
import { Database } from '../lib/database';
import { PinataClient } from '../lib/pinata';
import {
  validateFilePath,
  getFileInfo,
  generateBasicMetadata,
  parseTagsString,
  formatFileSize
} from '../lib/utils';

interface AddOptions {
  tags?: string;
  title?: string;
  description?: string;
}

export async function addCommand(filePath: string, options: AddOptions) {
  const spinner = ora();

  try {
    // Validate file path
    validateFilePath(filePath);

    // Initialize vault manager
    const vaultManager = new VaultManager();

    // Check if vault is initialized
    if (!(await vaultManager.isVaultInitialized())) {
      console.error(chalk.red('❌ No vault found. Initialize one first:'));
      console.log(chalk.gray('   etherith init'));
      process.exit(1);
    }

    // Get vault configuration
    const config = await vaultManager.getConfig();
    if (!config) {
      throw new Error('Failed to load vault configuration');
    }

    // Check Pinata configuration
    if (!config.pinataApiKey || !config.pinataSecretKey) {
      console.error(chalk.red('❌ Pinata credentials not configured.'));
      console.log(chalk.blue('💡 Please configure Pinata in .etherith/config.json or reinitialize the vault.'));
      process.exit(1);
    }

    // Get file information
    spinner.start('Analyzing file...');
    const fileInfo = getFileInfo(filePath);

    if (!fileInfo.isValid) {
      throw new Error('Invalid file path');
    }

    spinner.succeed(`File analyzed: ${fileInfo.filename} (${formatFileSize(fileInfo.fileSize)})`);

    // Generate metadata
    spinner.start('Generating metadata...');
    const { title, description } = generateBasicMetadata(
      filePath,
      options.title,
      options.description
    );
    const tags = parseTagsString(options.tags);
    spinner.succeed('Metadata generated');

    // Initialize Pinata client
    const pinataClient = new PinataClient(config.pinataApiKey, config.pinataSecretKey);

    // Upload to IPFS via Pinata
    spinner.start('Uploading to IPFS...');
    try {
      const pinataResponse = await pinataClient.pinFile(filePath, {
        name: title,
        keyvalues: {
          vault: config.name,
          originalFilename: fileInfo.filename,
          tags: tags.join(',')
        }
      });

      spinner.succeed(`Uploaded to IPFS: ${pinataResponse.IpfsHash}`);

      // Save to local database
      spinner.start('Updating local index...');
      const database = new Database({ dbPath: vaultManager.getDatabasePath() });
      await database.initialize();

      // Check if file already exists
      const existingFile = await database.getFileByHash(pinataResponse.IpfsHash);
      if (existingFile) {
        await database.close();
        console.log(chalk.yellow('⚠️  File already exists in archive:'));
        console.log(chalk.gray(`   Title: ${existingFile.title}`));
        console.log(chalk.gray(`   IPFS: ${existingFile.ipfsHash}`));
        return;
      }

      await database.addFile({
        filename: fileInfo.filename,
        originalPath: fileInfo.originalPath,
        ipfsHash: pinataResponse.IpfsHash,
        title,
        description,
        tags,
        fileSize: fileInfo.fileSize,
        mimeType: fileInfo.mimeType
      });

      await database.close();
      spinner.succeed('Local index updated');

      // Success summary
      console.log(chalk.green('\n✅ File archived successfully!'));
      console.log(chalk.gray('━'.repeat(50)));
      console.log(chalk.blue('📄 File:'), chalk.white(fileInfo.filename));
      console.log(chalk.blue('📝 Title:'), chalk.white(title));
      console.log(chalk.blue('📦 IPFS Hash:'), chalk.white(pinataResponse.IpfsHash));
      console.log(chalk.blue('🏷️  Tags:'), chalk.white(tags.length > 0 ? tags.join(', ') : 'None'));
      console.log(chalk.blue('📏 Size:'), chalk.white(formatFileSize(fileInfo.fileSize)));
      console.log(chalk.blue('🔗 Gateway:'), chalk.gray(pinataClient.getGatewayUrl(pinataResponse.IpfsHash)));
      console.log(chalk.gray('━'.repeat(50)));

      console.log(chalk.blue('\n🔍 Search for this file:'));
      console.log(chalk.gray(`   etherith search "${title}"`));

    } catch (error: any) {
      spinner.fail('Upload failed');
      throw new Error(`IPFS upload failed: ${error.message}`);
    }

  } catch (error: any) {
    if (spinner.isSpinning) {
      spinner.fail('Operation failed');
    }
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}