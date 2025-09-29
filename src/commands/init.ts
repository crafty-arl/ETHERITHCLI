import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { VaultManager } from '../lib/vault';
import { Database } from '../lib/database';
import { EtherithApiClient } from '../lib/api-client';

export async function initCommand(vaultName?: string) {
  const spinner = ora();

  try {
    const vaultManager = new VaultManager();

    // Check if vault is already initialized
    if (await vaultManager.isVaultInitialized()) {
      console.log(chalk.yellow('⚠️  Vault already initialized in this directory'));
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'Do you want to reinitialize? (This will not delete existing files)',
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.blue('ℹ️  Initialization cancelled'));
        return;
      }
    }

    // Get vault name
    const name = vaultName || vaultManager.getVaultName();

    console.log(chalk.blue(`🚀 Initializing Etheirth family vault: "${name}"`));

    // Test API connection (Pinata credentials are handled by Cloudflare API)
    spinner.start('Testing connection to Etheirth API...');
    try {
      const apiClient = new EtherithApiClient();

      // Test health endpoint
      await apiClient.healthCheck();

      // Test Pinata connection through API
      const pinataTest = await apiClient.testPinataConnection();

      if (pinataTest.data?.connectionStatus !== 'connected') {
        throw new Error('IPFS storage service unavailable');
      }

      spinner.succeed('Connected to Etheirth cloud services');
    } catch (error: any) {
      spinner.fail(`Connection failed: ${error.message}`);
      console.log(chalk.red('❌ Unable to connect to Etheirth services. Please check your internet connection.'));
      process.exit(1);
    }

    // Initialize vault configuration
    spinner.start('Creating family vault...');
    await vaultManager.initializeVault(name);
    spinner.succeed('Family vault created');

    // Initialize database
    spinner.start('Setting up local database...');
    const database = new Database({ dbPath: vaultManager.getDatabasePath() });
    await database.initialize();
    await database.close();
    spinner.succeed('Local database initialized');

    console.log(chalk.green('\n✅ Family vault initialized successfully!'));
    console.log(chalk.gray(`📁 Family Archive: ${name}`));
    console.log(chalk.gray(`📍 Location: ${vaultManager.getVaultPath()}`));
    console.log(chalk.gray('🔗 IPFS Storage: Connected via Etheirth cloud services'));
    console.log(chalk.gray('🌐 Your family\'s treasures will be preserved forever'));

    console.log(chalk.blue('\n🎯 Start preserving your family\'s legacy:'));
    console.log(chalk.gray('   • Preserve treasures: etherith add <file>'));
    console.log(chalk.gray('   • Find memories: etherith search <query>'));
    console.log(chalk.gray('   • Share heritage: Every file gets a permanent IPFS link'));

  } catch (error: any) {
    if (spinner.isSpinning) {
      spinner.fail('Initialization failed');
    }
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}