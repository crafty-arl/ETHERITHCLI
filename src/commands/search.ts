import chalk from 'chalk';
import ora from 'ora';
import { VaultManager } from '../lib/vault';
import { Database } from '../lib/database';
import { PinataClient } from '../lib/pinata';
import { formatFileSize, formatDate } from '../lib/utils';
import { FileRecord } from '../types';

interface SearchOptions {
  limit?: string;
  format?: 'table' | 'json';
}

export async function searchCommand(query: string, options: SearchOptions) {
  const spinner = ora();

  try {
    // Initialize vault manager
    const vaultManager = new VaultManager();

    // Check if vault is initialized
    if (!(await vaultManager.isVaultInitialized())) {
      console.error(chalk.red('❌ No vault found. Initialize one first:'));
      console.log(chalk.gray('   etherith init'));
      process.exit(1);
    }

    const limit = parseInt(options.limit || '10');
    const format = options.format || 'table';

    spinner.start(`Searching for "${query}"...`);

    // Search in local database
    const database = new Database({ dbPath: vaultManager.getDatabasePath() });
    await database.initialize();

    const results = await database.searchFiles(query, limit);
    await database.close();

    spinner.succeed(`Found ${results.length} result(s)`);

    if (results.length === 0) {
      console.log(chalk.yellow('\n🔍 No files found matching your query.'));
      console.log(chalk.blue('\n💡 Tips:'));
      console.log(chalk.gray('   • Try broader search terms'));
      console.log(chalk.gray('   • Search by filename, title, description, or tags'));
      console.log(chalk.gray('   • Use partial words (e.g., "photo" instead of "photography")'));
      return;
    }

    // Display results
    if (format === 'json') {
      console.log(JSON.stringify(results, null, 2));
    } else {
      await displayTableResults(results);
    }

  } catch (error: any) {
    if (spinner.isSpinning) {
      spinner.fail('Search failed');
    }
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}

async function displayTableResults(results: FileRecord[]) {
  console.log(chalk.green(`\n📋 Search Results (${results.length} found):`));
  console.log(chalk.gray('━'.repeat(80)));

  for (let i = 0; i < results.length; i++) {
    const file = results[i];
    const num = (i + 1).toString().padStart(2, ' ');

    console.log(chalk.blue(`${num}. ${file.title}`));
    console.log(chalk.gray(`    📄 File: ${file.filename}`));
    console.log(chalk.gray(`    📦 IPFS: ${file.ipfsHash}`));
    console.log(chalk.gray(`    📏 Size: ${formatFileSize(file.fileSize)} | Type: ${file.mimeType}`));

    if (file.description && file.description !== file.title) {
      console.log(chalk.gray(`    📝 Description: ${file.description}`));
    }

    if (file.tags && file.tags.length > 0) {
      console.log(chalk.gray(`    🏷️  Tags: ${file.tags.join(', ')}`));
    }

    console.log(chalk.gray(`    📅 Added: ${formatDate(file.createdAt)}`));

    // Add gateway link
    const config = await getVaultConfig();
    if (config?.pinataApiKey) {
      const pinataClient = new PinataClient(config.pinataApiKey, config.pinataSecretKey || '');
      console.log(chalk.gray(`    🔗 Gateway: ${pinataClient.getGatewayUrl(file.ipfsHash)}`));
    }

    if (i < results.length - 1) {
      console.log('');
    }
  }

  console.log(chalk.gray('━'.repeat(80)));

  // Show usage tips
  console.log(chalk.blue('\n💡 Usage tips:'));
  console.log(chalk.gray('   • Copy IPFS hash to access file directly'));
  console.log(chalk.gray('   • Use gateway URL to view/download file'));
  console.log(chalk.gray('   • Refine search with more specific terms'));
}

async function getVaultConfig() {
  try {
    const vaultManager = new VaultManager();
    return await vaultManager.getConfig();
  } catch (error) {
    return null;
  }
}