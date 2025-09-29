import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { FileRecord, DatabaseOptions } from '../types';

export class Database {
  private db: sqlite3.Database;
  private dbPath: string;

  constructor(options: DatabaseOptions) {
    this.dbPath = options.dbPath;

    // Ensure directory exists
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new sqlite3.Database(this.dbPath);
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(`
          CREATE TABLE IF NOT EXISTS files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            originalPath TEXT NOT NULL,
            ipfsHash TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            tags TEXT,
            fileSize INTEGER NOT NULL,
            mimeType TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            // Create indexes for faster searching
            this.db.run(`CREATE INDEX IF NOT EXISTS idx_filename ON files(filename)`);
            this.db.run(`CREATE INDEX IF NOT EXISTS idx_title ON files(title)`);
            this.db.run(`CREATE INDEX IF NOT EXISTS idx_tags ON files(tags)`);
            this.db.run(`CREATE INDEX IF NOT EXISTS idx_ipfsHash ON files(ipfsHash)`);
            resolve();
          }
        });
      });
    });
  }

  async addFile(record: Omit<FileRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    return new Promise((resolve, reject) => {
      const tagsString = JSON.stringify(record.tags);
      const stmt = this.db.prepare(`
        INSERT INTO files (filename, originalPath, ipfsHash, title, description, tags, fileSize, mimeType)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run([
        record.filename,
        record.originalPath,
        record.ipfsHash,
        record.title,
        record.description,
        tagsString,
        record.fileSize,
        record.mimeType
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });

      stmt.finalize();
    });
  }

  async getFileByHash(ipfsHash: string): Promise<FileRecord | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM files WHERE ipfsHash = ?',
        [ipfsHash],
        (err, row: any) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve({
              ...row,
              tags: JSON.parse(row.tags || '[]')
            });
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  async searchFiles(query: string, limit: number = 10): Promise<FileRecord[]> {
    return new Promise((resolve, reject) => {
      const searchPattern = `%${query.toLowerCase()}%`;

      this.db.all(`
        SELECT * FROM files
        WHERE
          LOWER(filename) LIKE ? OR
          LOWER(title) LIKE ? OR
          LOWER(description) LIKE ? OR
          LOWER(tags) LIKE ?
        ORDER BY updatedAt DESC
        LIMIT ?
      `, [searchPattern, searchPattern, searchPattern, searchPattern, limit], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const files = rows.map(row => ({
            ...row,
            tags: JSON.parse(row.tags || '[]')
          }));
          resolve(files);
        }
      });
    });
  }

  async getAllFiles(): Promise<FileRecord[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM files ORDER BY updatedAt DESC', [], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const files = rows.map(row => ({
            ...row,
            tags: JSON.parse(row.tags || '[]')
          }));
          resolve(files);
        }
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}