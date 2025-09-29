import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export function getFileInfo(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  return {
    filename: path.basename(filePath),
    originalPath: path.resolve(filePath),
    fileSize: stats.size,
    mimeType: getMimeType(ext),
    isValid: stats.isFile()
  };
}

export function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.zip': 'application/zip',
    '.rar': 'application/x-rar-compressed',
    '.7z': 'application/x-7z-compressed'
  };

  return mimeTypes[extension] || 'application/octet-stream';
}

export function generateBasicMetadata(filePath: string, customTitle?: string, customDescription?: string): {
  title: string;
  description: string;
} {
  const filename = path.basename(filePath);
  const nameWithoutExt = path.parse(filename).name;

  // Generate a basic title from filename if not provided
  const title = customTitle || nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  // Generate basic description
  const ext = path.extname(filePath).toLowerCase();
  const fileType = getFileTypeDescription(ext);
  const description = customDescription || `${fileType} file: ${filename}`;

  return { title, description };
}

export function getFileTypeDescription(extension: string): string {
  const typeDescriptions: Record<string, string> = {
    '.txt': 'Text document',
    '.md': 'Markdown document',
    '.json': 'JSON data',
    '.jpg': 'JPEG image',
    '.jpeg': 'JPEG image',
    '.png': 'PNG image',
    '.gif': 'GIF image',
    '.webp': 'WebP image',
    '.pdf': 'PDF document',
    '.doc': 'Word document',
    '.docx': 'Word document',
    '.xls': 'Excel spreadsheet',
    '.xlsx': 'Excel spreadsheet',
    '.mp4': 'MP4 video',
    '.mov': 'QuickTime video',
    '.avi': 'AVI video',
    '.mp3': 'MP3 audio',
    '.wav': 'WAV audio',
    '.zip': 'ZIP archive',
    '.rar': 'RAR archive',
    '.7z': '7-Zip archive'
  };

  return typeDescriptions[extension] || 'Binary file';
}

export function parseTagsString(tagsString?: string): string[] {
  if (!tagsString) return [];

  return tagsString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => tag.toLowerCase());
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

export function validateFilePath(filePath: string): void {
  if (!filePath) {
    throw new Error('File path is required');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }
}

export function getFileHash(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}