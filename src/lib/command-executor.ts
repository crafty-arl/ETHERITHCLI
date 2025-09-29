import { addCommand } from '../commands/add';
import { searchCommand } from '../commands/search';
import { initCommand } from '../commands/init';

/**
 * Execute a structured command with arguments
 */
export async function execCommand(command: string, args: string[]): Promise<void> {
  switch (command) {
    case 'add':
      await executeAddCommand(args);
      break;

    case 'search':
      await executeSearchCommand(args);
      break;

    case 'init':
      await executeInitCommand(args);
      break;


    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

/**
 * Execute the add command with parsed arguments
 */
async function executeAddCommand(args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error('Add command requires a file path');
  }

  const filePath = args[0];
  const options: any = {};

  // Parse options
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--tags' && i + 1 < args.length) {
      options.tags = args[i + 1];
      i++; // Skip next argument as it's the value
    } else if (arg === '--title' && i + 1 < args.length) {
      options.title = args[i + 1];
      i++;
    } else if (arg === '--description' && i + 1 < args.length) {
      options.description = args[i + 1];
      i++;
    }
  }

  await addCommand(filePath, options);
}

/**
 * Execute the search command with parsed arguments
 */
async function executeSearchCommand(args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error('Search command requires a query');
  }

  const query = args[0];
  const options: any = {};

  // Parse options
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--limit' && i + 1 < args.length) {
      options.limit = args[i + 1];
      i++;
    } else if (arg === '--format' && i + 1 < args.length) {
      options.format = args[i + 1];
      i++;
    }
  }

  await searchCommand(query, options);
}

/**
 * Execute the init command with parsed arguments
 */
async function executeInitCommand(args: string[]): Promise<void> {
  const vaultName = args[0]; // Optional vault name
  await initCommand(vaultName);
}

