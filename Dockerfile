# Multi-stage Docker build for Etherith CLI with LangGraph NLP
# Optimized for production deployment and minimal size

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci --only=production=false

# Copy source code
COPY src/ ./src/
COPY langraph-config.yaml ./

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S etherith && \
    adduser -S etherith -u 1001

# Install only runtime dependencies
RUN apk add --no-cache dumb-init

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/langraph-config.yaml ./

# Copy configuration files
COPY --chown=etherith:etherith langraph-config.yaml ./config/

# Create necessary directories and set permissions
RUN mkdir -p /app/.etherith /app/logs && \
    chown -R etherith:etherith /app

# Switch to non-root user
USER etherith

# Set environment variables
ENV NODE_ENV=production
ENV ETHERITH_CONFIG_PATH=/app/config/langraph-config.yaml

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node dist/cli.js test-api || exit 1

# Default command
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/cli.js"]

# Labels for metadata
LABEL maintainer="Etherith Team"
LABEL version="1.0.0"
LABEL description="Etherith CLI with LangGraph Natural Language Processing"