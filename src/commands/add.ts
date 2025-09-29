import chalk from 'chalk';
import ora from 'ora';
import { VaultManager } from '../lib/vault';
import { Database } from '../lib/database';
import { EtherithApiClient } from '../lib/api-client';
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
      throw new Error('Failed to load family vault configuration');
    }

    // Get file information
    spinner.start('Analyzing family treasure...');
    const fileInfo = getFileInfo(filePath);

    if (!fileInfo.isValid) {
      throw new Error('Invalid file path');
    }

    spinner.succeed(`Family treasure analyzed: ${fileInfo.filename} (${formatFileSize(fileInfo.fileSize)})`);

    // Generate metadata
    spinner.start('Generating heritage metadata...');
    const { title, description } = generateBasicMetadata(
      filePath,
      options.title,
      options.description
    );
    const tags = parseTagsString(options.tags);
    spinner.succeed('Heritage metadata generated');

    // Upload via Etheirth API (Pinata credentials handled by Cloudflare)
    spinner.start('Preserving to IPFS via Etheirth cloud...');
    try {
      const apiClient = new EtherithApiClient();

      // Use the API client to upload file
      const uploadResponse = await apiClient.uploadFile(filePath, {
        title,
        description,
        tags
      });

      spinner.succeed(`Preserved to IPFS: ${uploadResponse.ipfsHash}`);

      // Save to local database
      spinner.start('Updating family archive index...');
      const database = new Database({ dbPath: vaultManager.getDatabasePath() });
      await database.initialize();

      // Check if file already exists
      const existingFile = await database.getFileByHash(uploadResponse.ipfsHash);
      if (existingFile) {
        await database.close();
        console.log(chalk.yellow('⚠️  Family treasure already preserved:'));
        console.log(chalk.gray(`   Title: ${existingFile.title}`));
        console.log(chalk.gray(`   IPFS: ${existingFile.ipfsHash}`));
        return;
      }

      await database.addFile({
        filename: fileInfo.filename,
        originalPath: fileInfo.originalPath,
        ipfsHash: uploadResponse.ipfsHash,
        title: uploadResponse.title,
        description: uploadResponse.description,
        tags: uploadResponse.tags,
        fileSize: uploadResponse.fileSize,
        mimeType: uploadResponse.mimeType
      });

      await database.close();
      spinner.succeed('Family archive index updated');

      // Success summary
      console.log(chalk.green('\n✅ Family treasure preserved successfully!'));
      console.log(chalk.gray('━'.repeat(60)));
      console.log(chalk.blue('📄 Family Treasure:'), chalk.white(fileInfo.filename));
      console.log(chalk.blue('📝 Heritage Title:'), chalk.white(uploadResponse.title));
      console.log(chalk.blue('📦 IPFS Hash:'), chalk.white(uploadResponse.ipfsHash));
      console.log(chalk.blue('🏷️  Heritage Tags:'), chalk.white(uploadResponse.tags.length > 0 ? uploadResponse.tags.join(', ') : 'None'));
      console.log(chalk.blue('📏 Size:'), chalk.white(formatFileSize(uploadResponse.fileSize)));
      console.log(chalk.blue('🔗 Gateway:'), chalk.gray(uploadResponse.gatewayUrl));
      console.log(chalk.gray('━'.repeat(60)));

      console.log(chalk.blue('\n🔍 Find this treasure:'));
      console.log(chalk.gray(`   etherith search "${uploadResponse.title}"`));

      console.log(chalk.blue('\n🌐 Share with family:'));
      console.log(chalk.gray(`   ${uploadResponse.gatewayUrl}`));

    } catch (error: any) {
      spinner.fail('Preservation failed');
      throw new Error(`Family treasure preservation failed: ${error.message}`);
    }

  } catch (error: any) {
    if (spinner.isSpinning) {
      spinner.fail('Operation failed');
    }
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}