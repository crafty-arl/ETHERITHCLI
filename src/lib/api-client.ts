import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export interface FileUploadResponse {
  id: number;
  filename: string;
  title: string;
  description: string;
  tags: string[];
  ipfsHash: string;
  fileSize: number;
  mimeType: string;
  gatewayUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  results: Array<{
    id: number;
    filename: string;
    title: string;
    description: string;
    tags: string[];
    ipfsHash: string;
    fileSize: number;
    mimeType: string;
    relevanceScore?: number;
    matchType: string;
    createdAt: string;
  }>;
  query: string;
  totalResults: number;
  searchTime: string;
}

export class EtherithApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string = 'https://etherith-api.carl-lewis.workers.dev') {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000, // 30 seconds for file uploads
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error.message);
        }
        throw error;
      }
    );
  }

  async healthCheck(): Promise<ApiResponse> {
    const response = await this.client.get('/health');
    return response.data;
  }

  async testPinataConnection(): Promise<ApiResponse> {
    const response = await this.client.get('/api/pinata/test');
    return response.data;
  }

  async uploadFile(
    filePath: string,
    metadata: {
      title?: string;
      description?: string;
      tags?: string[];
    } = {}
  ): Promise<FileUploadResponse> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    if (metadata.title) {
      formData.append('title', metadata.title);
    }

    if (metadata.description) {
      formData.append('description', metadata.description);
    }

    if (metadata.tags && metadata.tags.length > 0) {
      formData.append('tags', metadata.tags.join(','));
    }

    const response = await this.client.post('/api/files', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Upload failed');
    }

    return response.data.data;
  }

  async searchFiles(
    query: string,
    options: {
      limit?: number;
      tags?: string[];
      mimeType?: string;
    } = {}
  ): Promise<SearchResponse> {
    const params = new URLSearchParams();
    params.append('q', query);

    if (options.limit) {
      params.append('limit', options.limit.toString());
    }

    if (options.tags && options.tags.length > 0) {
      params.append('tags', options.tags.join(','));
    }

    if (options.mimeType) {
      params.append('mimeType', options.mimeType);
    }

    const response = await this.client.get(`/api/files/search?${params.toString()}`);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Search failed');
    }

    return response.data.data;
  }

  async getFile(id: number): Promise<FileUploadResponse> {
    const response = await this.client.get(`/api/files/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'File not found');
    }

    return response.data.data;
  }

  async updateFile(
    id: number,
    updates: {
      title?: string;
      description?: string;
      tags?: string[];
    }
  ): Promise<FileUploadResponse> {
    const response = await this.client.put(`/api/files/${id}`, updates);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Update failed');
    }

    return response.data.data;
  }

  async deleteFile(id: number): Promise<void> {
    const response = await this.client.delete(`/api/files/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Delete failed');
    }
  }
}