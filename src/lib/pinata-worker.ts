// Cloudflare Workers-compatible Pinata client
// This version doesn't use Node.js file system APIs

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export class PinataWorkerClient {
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
      const response = await fetch(`${this.baseUrl}/data/testAuthentication`, {
        headers: this.getHeaders()
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async pinFileFromBuffer(
    fileBuffer: ArrayBuffer,
    filename: string,
    metadata?: { name?: string; keyvalues?: Record<string, string> }
  ): Promise<PinataResponse> {
    const formData = new FormData();

    // Create a blob from the buffer
    const blob = new Blob([fileBuffer]);
    formData.append('file', blob, filename);

    if (metadata) {
      const pinataMetadata = {
        name: metadata.name || filename,
        keyvalues: metadata.keyvalues || {}
      };
      formData.append('pinataMetadata', JSON.stringify(pinataMetadata));
    }

    const pinataOptions = {
      cidVersion: 1
    };
    formData.append('pinataOptions', JSON.stringify(pinataOptions));

    try {
      const response = await fetch(`${this.baseUrl}/pinning/pinFileToIPFS`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pinata API error: ${response.status} - ${errorText}`);
      }

      return await response.json() as PinataResponse;
    } catch (error: any) {
      throw new Error(`Failed to pin file: ${error.message}`);
    }
  }

  async getFileInfo(ipfsHash: string): Promise<any> {
    try {
      const url = new URL(`${this.baseUrl}/data/pinList`);
      url.searchParams.append('hashContains', ipfsHash);
      url.searchParams.append('status', 'pinned');

      const response = await fetch(url.toString(), {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as any;
      return data.rows?.[0] || null;
    } catch (error: any) {
      throw new Error(`Failed to get file info: ${error.message}`);
    }
  }

  async unpinFile(ipfsHash: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/pinning/unpin/${ipfsHash}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      return response.ok;
    } catch (error: any) {
      throw new Error(`Failed to unpin file: ${error.message}`);
    }
  }

  getGatewayUrl(ipfsHash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }

  async pinJSON(jsonData: any, metadata?: { name?: string; keyvalues?: Record<string, string> }): Promise<PinataResponse> {
    const body: any = {
      pinataContent: jsonData
    };

    if (metadata) {
      body.pinataMetadata = {
        name: metadata.name || 'json-data',
        keyvalues: metadata.keyvalues || {}
      };
    }

    body.pinataOptions = {
      cidVersion: 1
    };

    try {
      const response = await fetch(`${this.baseUrl}/pinning/pinJSONToIPFS`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pinata API error: ${response.status} - ${errorText}`);
      }

      return await response.json() as PinataResponse;
    } catch (error: any) {
      throw new Error(`Failed to pin JSON: ${error.message}`);
    }
  }
}