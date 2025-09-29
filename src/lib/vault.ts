import fs from 'fs';
import path from 'path';
import { VaultConfig } from '../types';

export class VaultManager {
  private configFile: string;
  private vaultDir: string;

  constructor(vaultPath: string = process.cwd()) {
    this.vaultDir = vaultPath;
    this.configFile = path.join(vaultPath, '.etherith', 'config.json');
  }

  async isVaultInitialized(): Promise<boolean> {
    return fs.existsSync(this.configFile);
  }

  async initializeVault(name: string): Promise<VaultConfig> {
    const vaultDirPath = path.join(this.vaultDir, '.etherith');

    // Create .etherith directory if it doesn't exist
    if (!fs.existsSync(vaultDirPath)) {
      fs.mkdirSync(vaultDirPath, { recursive: true });
    }

    const config: VaultConfig = {
      name,
      createdAt: new Date().toISOString(),
      version: '0.2.0'
    };

    await this.saveConfig(config);
    return config;
  }

  async getConfig(): Promise<VaultConfig | null> {
    if (!fs.existsSync(this.configFile)) {
      return null;
    }

    try {
      const content = fs.readFileSync(this.configFile, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read vault config: ${error}`);
    }
  }

  async saveConfig(config: VaultConfig): Promise<void> {
    const vaultDirPath = path.dirname(this.configFile);

    if (!fs.existsSync(vaultDirPath)) {
      fs.mkdirSync(vaultDirPath, { recursive: true });
    }

    try {
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
    } catch (error) {
      throw new Error(`Failed to save vault config: ${error}`);
    }
  }

  // Pinata credentials are now handled by Cloudflare API - no longer needed locally

  getDatabasePath(): string {
    return path.join(this.vaultDir, '.etherith', 'index.db');
  }

  getVaultName(): string {
    return path.basename(this.vaultDir);
  }

  getVaultPath(): string {
    return this.vaultDir;
  }
}