# Etherith CLI - API Documentation

This document outlines the API specification for the Etherith Memory Archival Platform API server (v0.2+).

## 📋 API Overview

### Base URL
- **Production**: `https://etherith-api.your-domain.workers.dev`
- **Staging**: `https://etherith-api-staging.your-domain.workers.dev`
- **Development**: `http://localhost:8787`

### Authentication
All API endpoints require JWT authentication via Bearer token.

```http
Authorization: Bearer <jwt-token>
```

### Response Format
All responses follow a consistent JSON structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid file format",
    "details": { ... }
  },
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

## 🔐 Authentication Endpoints

### POST /auth/login
Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "expiresIn": "7d"
  }
}
```

### POST /auth/register
Create new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "secure_password"
}
```

### POST /auth/refresh
Refresh JWT token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

## 📁 File Management Endpoints

### POST /api/files
Upload a file to the archive.

**Request:** (multipart/form-data)
- `file`: File to upload (required)
- `title`: Custom title (optional)
- `description`: File description (optional)
- `tags`: Comma-separated tags (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "filename": "vacation.jpg",
    "title": "Italy Trip 2024",
    "description": "Photos from Rome vacation",
    "tags": ["travel", "italy", "vacation"],
    "ipfsHash": "bafybeicidexample123",
    "fileSize": 2453678,
    "mimeType": "image/jpeg",
    "gatewayUrl": "https://gateway.pinata.cloud/ipfs/bafybeicidexample123",
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid file format or size
- `401`: Unauthorized
- `413`: File too large
- `500`: Upload failed

### GET /api/files
List user's archived files with pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sortBy`: Sort field (createdAt, updatedAt, filename, fileSize)
- `sortOrder`: asc or desc (default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": 123,
        "filename": "vacation.jpg",
        "title": "Italy Trip 2024",
        "description": "Photos from Rome vacation",
        "tags": ["travel", "italy"],
        "ipfsHash": "bafybeicidexample123",
        "fileSize": 2453678,
        "mimeType": "image/jpeg",
        "createdAt": "2024-03-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/files/:id
Get specific file details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "filename": "vacation.jpg",
    "originalPath": "/uploads/vacation.jpg",
    "title": "Italy Trip 2024",
    "description": "Photos from Rome vacation",
    "tags": ["travel", "italy", "vacation"],
    "ipfsHash": "bafybeicidexample123",
    "fileSize": 2453678,
    "mimeType": "image/jpeg",
    "gatewayUrl": "https://gateway.pinata.cloud/ipfs/bafybeicidexample123",
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  }
}
```

### PUT /api/files/:id
Update file metadata.

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["new", "tags", "here"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Updated Title",
    "description": "Updated description",
    "tags": ["new", "tags", "here"],
    "updatedAt": "2024-03-15T11:00:00.000Z"
  }
}
```

### DELETE /api/files/:id
Delete a file from the archive.

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

## 🔍 Search Endpoints

### GET /api/files/search
Search archived files.

**Query Parameters:**
- `q`: Search query (required)
- `limit`: Maximum results (default: 10, max: 100)
- `offset`: Result offset (default: 0)
- `tags`: Filter by tags (comma-separated)
- `mimeType`: Filter by MIME type
- `dateFrom`: Filter by creation date (ISO 8601)
- `dateTo`: Filter by creation date (ISO 8601)

**Example Request:**
```http
GET /api/files/search?q=vacation&tags=travel,italy&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": 123,
        "filename": "vacation.jpg",
        "title": "Italy Trip 2024",
        "description": "Photos from Rome vacation",
        "tags": ["travel", "italy", "vacation"],
        "ipfsHash": "bafybeicidexample123",
        "fileSize": 2453678,
        "mimeType": "image/jpeg",
        "relevanceScore": 0.95,
        "matchType": "title",
        "createdAt": "2024-03-15T10:30:00.000Z"
      }
    ],
    "query": "vacation",
    "totalResults": 15,
    "searchTime": "23ms"
  }
}
```

### GET /api/files/search/suggestions
Get search suggestions based on partial query.

**Query Parameters:**
- `q`: Partial search query (required)
- `limit`: Maximum suggestions (default: 5)

**Response:**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      "vacation photos",
      "vacation italy",
      "vacation 2024"
    ]
  }
}
```

## 📊 Analytics Endpoints

### GET /api/analytics/stats
Get user's archive statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFiles": 245,
    "totalSize": 1250000000,
    "fileTypes": {
      "image": 120,
      "document": 80,
      "video": 30,
      "audio": 10,
      "other": 5
    },
    "uploadTrend": {
      "thisMonth": 15,
      "lastMonth": 12,
      "growth": 25
    },
    "topTags": [
      { "tag": "work", "count": 45 },
      { "tag": "personal", "count": 30 },
      { "tag": "travel", "count": 25 }
    ]
  }
}
```

### GET /api/analytics/activity
Get user's recent activity.

**Query Parameters:**
- `limit`: Maximum activities (default: 10)
- `days`: Number of days back (default: 7)

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "type": "file_uploaded",
        "filename": "report.pdf",
        "timestamp": "2024-03-15T10:30:00.000Z"
      },
      {
        "type": "search_performed",
        "query": "work documents",
        "resultCount": 12,
        "timestamp": "2024-03-15T09:15:00.000Z"
      }
    ]
  }
}
```

## 🏷️ Tag Management Endpoints

### GET /api/tags
Get user's tags with usage counts.

**Response:**
```json
{
  "success": true,
  "data": {
    "tags": [
      { "name": "work", "count": 45, "color": "#3b82f6" },
      { "name": "personal", "count": 30, "color": "#10b981" },
      { "name": "travel", "count": 25, "color": "#f59e0b" }
    ]
  }
}
```

### POST /api/tags
Create or update a tag.

**Request:**
```json
{
  "name": "important",
  "color": "#ef4444",
  "description": "Important documents"
}
```

### DELETE /api/tags/:name
Delete a tag (removes from all files).

## 🔧 System Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-15T10:30:00.000Z",
  "version": "0.2.0",
  "services": {
    "database": "healthy",
    "pinata": "healthy",
    "cache": "healthy"
  },
  "metrics": {
    "uptime": 86400,
    "requestCount": 15420,
    "errorRate": 0.02
  }
}
```

### GET /api/config
Get user configuration and limits.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "name": "John Doe",
      "email": "user@example.com",
      "plan": "free"
    },
    "limits": {
      "maxFileSize": 100000000,
      "maxFiles": 1000,
      "maxStorage": 5000000000,
      "apiRateLimit": 100
    },
    "usage": {
      "fileCount": 245,
      "storageUsed": 1250000000,
      "apiCallsToday": 45
    }
  }
}
```

## 🚫 Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input data |
| `AUTHENTICATION_ERROR` | Invalid credentials |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `FILE_TOO_LARGE` | File exceeds size limit |
| `QUOTA_EXCEEDED` | Storage or file limit reached |
| `UPLOAD_FAILED` | File upload to IPFS failed |
| `DATABASE_ERROR` | Database operation failed |
| `EXTERNAL_API_ERROR` | Third-party service error |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

## 📝 Rate Limiting

API endpoints are rate-limited based on user plan:

| Plan | Requests/Minute | Burst Limit |
|------|----------------|-------------|
| **Free** | 60 | 100 |
| **Pro** | 300 | 500 |
| **Enterprise** | 1000 | 2000 |

Rate limit headers included in responses:
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1647340800
```

## 🔄 WebSocket Events (Future)

Real-time notifications for file operations:

### Connection
```javascript
const ws = new WebSocket('wss://etherith-api.your-domain.workers.dev/ws');
```

### Events
- `file.uploaded` - File upload completed
- `file.processed` - Metadata extraction completed
- `file.deleted` - File deleted
- `search.completed` - Search operation finished

## 📚 SDK Usage Examples

### JavaScript/Node.js

```javascript
import { EtherithClient } from '@etherith/sdk';

const client = new EtherithClient({
  apiUrl: 'https://etherith-api.your-domain.workers.dev',
  token: 'your-jwt-token'
});

// Upload file
const result = await client.files.upload('./document.pdf', {
  title: 'Important Document',
  tags: ['work', 'important']
});

// Search files
const files = await client.files.search('work documents', {
  limit: 20,
  tags: ['work']
});

// Get file details
const file = await client.files.get(123);
```

### Python

```python
from etherith import EtherithClient

client = EtherithClient(
    api_url='https://etherith-api.your-domain.workers.dev',
    token='your-jwt-token'
)

# Upload file
result = client.files.upload('./document.pdf',
    title='Important Document',
    tags=['work', 'important']
)

# Search files
files = client.files.search('work documents',
    limit=20,
    tags=['work']
)
```

This API documentation provides a complete reference for building applications on top of the Etherith platform, enabling developers to create custom interfaces and integrations.