#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { searchCommand } from './commands/search';
// import { simpleNLCommand } from './commands/simple-nl';

const program = new Command();

program
  .name('etherith')
  .description('CLI for archival memory storage on IPFS')
  .version('0.2.0');

program
  .command('init')
  .description('Initialize a new Etherith vault in the current directory')
  .argument('[name]', 'Name of the vault (defaults to current directory name)')
  .action(initCommand);

program
  .command('add')
  .description('Add a file to the archive with AI-extracted metadata')
  .argument('<file>', 'Path to the file to archive')
  .option('--tags <tags>', 'Comma-separated tags for the file')
  .option('--title <title>', 'Custom title for the file')
  .option('--description <description>', 'Custom description for the file')
  .action(addCommand);

program
  .command('search')
  .description('Search archived files by keyword or content')
  .argument('<query>', 'Search query (keywords, tags, or content)')
  .option('--limit <limit>', 'Maximum number of results to return', '10')
  .option('--format <format>', 'Output format (table, json)', 'table')
  .action(searchCommand);


// Natural language commands temporarily disabled for production build
// program
//   .command('ask')
//   .alias('nl')
//   .description('Simple natural language to command mapping')
//   .argument('<input>', 'Natural language description (e.g., "search for photos")')
//   .option('-p, --preview', 'Show generated command without executing')
//   .option('-d, --debug', 'Show debug information')
//   .action(simpleNLCommand);

program.parse();

process.on('unhandledRejection', (error) => {
  console.error(chalk.red('Error:'), error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});