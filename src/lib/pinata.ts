import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { PinataResponse } from '../types';

export class PinataClient {
  private apiKey: string;
  private secretKey: string;
  private baseUrl: string = 'https://api.pinata.cloud';

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  private getHeaders() {
    return {
      'pinata_api_key': this.apiKey,
      'pinata_secret_api_key': this.secretKey,
    };
  }

  async testAuthentication(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/data/testAuthentication`, {
        headers: this.getHeaders()
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async pinFile(filePath: string, metadata?: { name?: string; keyvalues?: Record<string, string> }): Promise<PinataResponse> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    if (metadata) {
      const pinataMetadata = {
        name: metadata.name || path.basename(filePath),
        keyvalues: metadata.keyvalues || {}
      };
      data.append('pinataMetadata', JSON.stringify(pinataMetadata));
    }

    const pinataOptions = {
      cidVersion: 1
    };
    data.append('pinataOptions', JSON.stringify(pinataOptions));

    try {
      const response = await axios.post(`${this.baseUrl}/pinning/pinFileToIPFS`, data, {
        headers: {
          ...this.getHeaders(),
          ...data.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Pinata API error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`);
      }
      throw new Error(`Network error: ${error.message}`);
    }
  }

  async getFileInfo(ipfsHash: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/data/pinList`, {
        headers: this.getHeaders(),
        params: {
          hashContains: ipfsHash,
          status: 'pinned'
        }
      });

      return response.data.rows?.[0] || null;
    } catch (error: any) {
      throw new Error(`Failed to get file info: ${error.message}`);
    }
  }

  async unpinFile(ipfsHash: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.baseUrl}/pinning/unpin/${ipfsHash}`, {
        headers: this.getHeaders()
      });

      return response.status === 200;
    } catch (error: any) {
      throw new Error(`Failed to unpin file: ${error.message}`);
    }
  }

  getGatewayUrl(ipfsHash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }
}