import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { VaultManager } from '../lib/vault';
import { Database } from '../lib/database';
import { PinataClient } from '../lib/pinata';

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

    console.log(chalk.blue(`🚀 Initializing Etherith vault: "${name}"`));

    // Get Pinata credentials
    console.log(chalk.cyan('\n📌 Pinata IPFS Configuration (optional - can be configured later)'));
    const { configurePinata } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'configurePinata',
        message: 'Do you want to configure Pinata credentials now?',
        default: true
      }
    ]);

    let pinataApiKey: string | undefined;
    let pinataSecretKey: string | undefined;

    if (configurePinata) {
      const credentials = await inquirer.prompt([
        {
          type: 'input',
          name: 'apiKey',
          message: 'Pinata API Key:',
          validate: (input) => input.length > 0 || 'API Key is required'
        },
        {
          type: 'password',
          name: 'secretKey',
          message: 'Pinata Secret Key:',
          validate: (input) => input.length > 0 || 'Secret Key is required'
        }
      ]);

      pinataApiKey = credentials.apiKey;
      pinataSecretKey = credentials.secretKey;

      // Test Pinata connection
      spinner.start('Testing Pinata connection...');
      try {
        if (!pinataApiKey || !pinataSecretKey) {
          throw new Error('Missing API credentials');
        }
        const pinataClient = new PinataClient(pinataApiKey, pinataSecretKey);
        const isValid = await pinataClient.testAuthentication();

        if (!isValid) {
          throw new Error('Invalid Pinata credentials');
        }

        spinner.succeed('Pinata connection successful');
      } catch (error: any) {
        spinner.fail(`Pinata connection failed: ${error.message}`);
        console.log(chalk.yellow('⚠️  Continuing without Pinata configuration. You can configure it later.'));
        pinataApiKey = undefined;
        pinataSecretKey = undefined;
      }
    }

    // Initialize vault configuration
    spinner.start('Creating vault configuration...');
    await vaultManager.initializeVault(name, pinataApiKey, pinataSecretKey);
    spinner.succeed('Vault configuration created');

    // Initialize database
    spinner.start('Setting up local database...');
    const database = new Database({ dbPath: vaultManager.getDatabasePath() });
    await database.initialize();
    await database.close();
    spinner.succeed('Local database initialized');

    console.log(chalk.green('\n✅ Vault initialized successfully!'));
    console.log(chalk.gray(`📁 Vault: ${name}`));
    console.log(chalk.gray(`📍 Location: ${vaultManager.getVaultPath()}`));

    if (pinataApiKey) {
      console.log(chalk.gray('🔗 Pinata: Configured'));
    } else {
      console.log(chalk.gray('🔗 Pinata: Not configured'));
      console.log(chalk.blue('\n💡 To configure Pinata later, you can manually edit:'));
      console.log(chalk.gray('   .etherith/config.json'));
    }

    console.log(chalk.blue('\n🎯 Next steps:'));
    console.log(chalk.gray('   • Add files: etherith add <file>'));
    console.log(chalk.gray('   • Search files: etherith search <query>'));

  } catch (error: any) {
    if (spinner.isSpinning) {
      spinner.fail('Initialization failed');
    }
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}