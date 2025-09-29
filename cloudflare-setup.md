# Cloudflare Setup Guide

This guide walks you through setting up your Pinata API keys securely in Cloudflare Workers.

## 🚀 Quick Setup (5 minutes)

### 1. Install Wrangler CLI

```bash
# Install globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### 2. Set up your Pinata secrets

```bash
# Set your Pinata API key (will prompt for value)
wrangler secret put PINATA_API_KEY

# Set your Pinata secret key (will prompt for value)
wrangler secret put PINATA_SECRET_KEY

# Set a JWT secret for future authentication
wrangler secret put JWT_SECRET
```

### 3. Install dependencies and build

```bash
# Install Cloudflare dependencies
npm install

# Build the worker
npm run build:worker
```

### 4. Deploy to Cloudflare

```bash
# Deploy to production
npm run deploy

# Or deploy to staging first
npm run deploy:staging
```

### 5. Test your deployment

After deployment, you'll get a URL like `https://etherith-api.your-subdomain.workers.dev`

Test the endpoints:

```bash
# Health check
curl https://etherith-api.your-subdomain.workers.dev/health

# Test Pinata connection
curl https://etherith-api.your-subdomain.workers.dev/api/pinata/test
```

## 🔧 Development Setup

### Local development with secrets

```bash
# Create .dev.vars file for local development (DO NOT COMMIT)
echo "PINATA_API_KEY=your_local_api_key" > .dev.vars
echo "PINATA_SECRET_KEY=your_local_secret_key" >> .dev.vars
echo "JWT_SECRET=your_local_jwt_secret" >> .dev.vars

# Start local development server
npm run dev:worker
```

The local server will run at `http://localhost:8787`

### Project structure for Workers

```
src/
├── worker.ts          # Main Worker entry point
├── lib/               # Shared libraries
│   ├── pinata.ts      # Pinata client (works in Workers)
│   └── utils.ts       # Utility functions
└── types/             # TypeScript types
    └── index.ts       # Type definitions
```

## 🔐 Security Benefits

### Before (Local CLI)
- API keys stored in `.etherith/config.json`
- Keys exposed in local file system
- No centralized key management
- Keys need to be configured per vault

### After (Cloudflare Workers)
- API keys stored securely in Cloudflare's encrypted environment
- Keys never exposed in client-side code
- Centralized key management across all users
- CLI communicates with secure API endpoints

## 📊 API Endpoints Available

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check and system status |
| `/api/pinata/test` | GET | Test Pinata API connection |
| `/api/files` | POST | Upload files (coming soon) |
| `/api/files/search` | GET | Search files (coming soon) |

## 🌍 Environment Management

### Production
```bash
wrangler deploy
# Deploys to: etherith-api.your-subdomain.workers.dev
```

### Staging
```bash
wrangler deploy --env staging
# Deploys to: etherith-api-staging.your-subdomain.workers.dev
```

### Environment-specific secrets
```bash
# Set production secrets
wrangler secret put PINATA_API_KEY --env production

# Set staging secrets
wrangler secret put PINATA_API_KEY --env staging
```

## 🔄 CLI Integration (Next Step)

The CLI will be updated to communicate with your Cloudflare Workers API instead of using local Pinata keys:

```bash
# Instead of storing keys locally
etherith init my-vault
# ↓ Pinata keys required in .etherith/config.json

# New flow with Workers API
etherith init my-vault --api-url https://etherith-api.your-subdomain.workers.dev
# ↓ CLI communicates with your secure API
```

## 💰 Cost Estimation

**Cloudflare Workers Pricing (2024):**
- Free tier: 100,000 requests/day
- Paid tier: $5/10 million requests

**For typical usage (10-100 files/user/month):**
- Estimated cost: **$0/month** (well within free tier)

## 🐛 Troubleshooting

### Common issues:

**"Secret not found" error:**
```bash
# List all secrets
wrangler secret list

# Delete and recreate if needed
wrangler secret delete PINATA_API_KEY
wrangler secret put PINATA_API_KEY
```

**Build errors:**
```bash
# Clean and rebuild
rm -rf dist/
npm run build:worker
```

**Deployment failures:**
```bash
# Check Wrangler configuration
wrangler whoami
wrangler dev --compatibility-date=2024-03-15
```

## 📈 What's Next

After setting up Cloudflare Workers:

1. **Test the API endpoints** with curl/Postman
2. **Update CLI** to use Workers API instead of local keys
3. **Add authentication** (Clerk integration)
4. **Build web UI** for archive viewing
5. **Add D1 database** for persistent storage

This setup creates the foundation for a scalable, secure API that your CLI (and future web UI) can communicate with.