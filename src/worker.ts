import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PinataWorkerClient } from './lib/pinata-worker';

type Bindings = {
  PINATA_API_KEY: string;
  PINATA_SECRET_KEY: string;
  JWT_SECRET: string;
  ENVIRONMENT: string;
  // Optional services (add when configured):
  // DB?: D1Database;
  // SESSIONS?: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://etherith.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '0.2.0',
    environment: c.env.ENVIRONMENT,
  });
});

// Test Pinata connection endpoint
app.get('/api/pinata/test', async (c) => {
  try {
    const pinataClient = new PinataWorkerClient(
      c.env.PINATA_API_KEY,
      c.env.PINATA_SECRET_KEY
    );

    const isValid = await pinataClient.testAuthentication();

    return c.json({
      success: true,
      data: {
        connectionStatus: isValid ? 'connected' : 'failed',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: {
        code: 'PINATA_CONNECTION_ERROR',
        message: error.message
      }
    }, 500);
  }
});

// File upload endpoint (basic structure)
app.post('/api/files', async (c) => {
  try {
    // TODO: Implement file upload logic
    // This endpoint will handle file uploads from the CLI

    return c.json({
      success: true,
      message: 'File upload endpoint - coming soon',
      data: {
        endpoint: 'POST /api/files',
        status: 'under_development'
      }
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: {
        code: 'UPLOAD_ERROR',
        message: error.message
      }
    }, 500);
  }
});

// Search endpoint (basic structure)
app.get('/api/files/search', async (c) => {
  try {
    const query = c.req.query('q');

    if (!query) {
      return c.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Search query is required'
        }
      }, 400);
    }

    // TODO: Implement search logic with D1 database

    return c.json({
      success: true,
      data: {
        results: [],
        query,
        message: 'Search endpoint - coming soon'
      }
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: {
        code: 'SEARCH_ERROR',
        message: error.message
      }
    }, 500);
  }
});

// Error handling
app.onError((err, c) => {
  console.error('Worker error:', err);

  return c.json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    }
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
      path: c.req.path
    }
  }, 404);
});

export default app;