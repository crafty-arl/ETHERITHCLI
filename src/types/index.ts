export interface VaultConfig {
  name: string;
  createdAt: string;
  version: string;
  pinataApiKey?: string;
  pinataSecretKey?: string;
}

export interface FileRecord {
  id?: number;
  filename: string;
  originalPath: string;
  ipfsHash: string;
  title: string;
  description: string;
  tags: string[];
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  record: FileRecord;
  relevanceScore?: number;
  matchType: 'filename' | 'title' | 'description' | 'tags';
}

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface DatabaseOptions {
  dbPath: string;
}