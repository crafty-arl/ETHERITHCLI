import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PinataWorkerClient } from './lib/pinata-worker';
import { openApiSpec } from './lib/openapi-spec';

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

// API Documentation endpoint
app.get('/docs', (c) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Etheirth API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
        .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: '/openapi.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>`;

  return c.html(html);
});

// OpenAPI JSON spec endpoint
app.get('/openapi.json', (c) => {
  return c.json(openApiSpec);
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