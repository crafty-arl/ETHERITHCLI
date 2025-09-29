export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Etheirth - Preserving Black and Brown Family Legacies API",
    version: "0.2.0",
    description: "API for Etheirth, a decentralized memory vault designed specifically for Black and Brown families to preserve and protect their most precious cultural artifacts. Your family's stories, memories, and cultural treasures deserve to live forever.",
    contact: {
      name: "Etheirth Support",
      url: "https://github.com/your-org/etherith-cli"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: "https://etherith-api.carl-lewis.workers.dev",
      description: "Production API Server"
    },
    {
      url: "https://etherith-api-staging.carl-lewis.workers.dev",
      description: "Staging API Server"
    }
  ],
  paths: {
    "/health": {
      get: {
        summary: "Health Check",
        description: "Check the health and status of the API service",
        tags: ["System"],
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "healthy"
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                      example: "2024-03-15T10:30:00.000Z"
                    },
                    version: {
                      type: "string",
                      example: "0.2.0"
                    },
                    environment: {
                      type: "string",
                      example: "production"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/pinata/test": {
      get: {
        summary: "Test IPFS Connection",
        description: "Test the connection to IPFS storage service to ensure file archival is working",
        tags: ["Storage"],
        responses: {
          "200": {
            description: "IPFS connection successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true
                    },
                    data: {
                      type: "object",
                      properties: {
                        connectionStatus: {
                          type: "string",
                          enum: ["connected", "failed"],
                          example: "connected"
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-03-15T10:30:00.000Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            description: "IPFS connection failed",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/files": {
      post: {
        summary: "Preserve Family Legacy",
        description: "Upload and permanently preserve a family treasure (photos, videos, documents, audio, cultural artifacts) to IPFS with AI-generated metadata for your family's digital heirloom chest",
        tags: ["Family Preservation"],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                    description: "The family treasure to preserve (photos, videos, documents, audio, cultural artifacts)"
                  },
                  title: {
                    type: "string",
                    description: "Custom title for the family treasure",
                    example: "Mama and Papa's Wedding Day"
                  },
                  description: {
                    type: "string",
                    description: "Detailed description of the family treasure and its significance",
                    example: "Traditional recipes passed down through generations from grandma's kitchen"
                  },
                  tags: {
                    type: "string",
                    description: "Comma-separated tags for organizing family heritage",
                    example: "wedding,family,1965,celebration,heritage"
                  }
                },
                required: ["file"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Family treasure successfully preserved",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true
                    },
                    data: {
                      "$ref": "#/components/schemas/PreservedTreasure"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid file or request data",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "413": {
            description: "File too large",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            description: "Archive operation failed",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/files/search": {
      get: {
        summary: "Find Family Heritage",
        description: "Search through your family's preserved treasures by family members, events, cultural artifacts, or any memorable detail",
        tags: ["Heritage Search"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Search query (family member, event, heritage item, or any memorable detail)",
            schema: {
              type: "string",
              example: "grandma wedding"
            }
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum number of family treasures to return",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 10,
              example: 20
            }
          },
          {
            name: "tags",
            in: "query",
            required: false,
            description: "Filter by specific heritage tags (comma-separated)",
            schema: {
              type: "string",
              example: "wedding,family,heritage"
            }
          },
          {
            name: "mimeType",
            in: "query",
            required: false,
            description: "Filter by file type",
            schema: {
              type: "string",
              enum: ["image/*", "video/*", "audio/*", "application/pdf", "text/*"],
              example: "audio/*"
            }
          },
          {
            name: "dateFrom",
            in: "query",
            required: false,
            description: "Filter family treasures preserved after this date",
            schema: {
              type: "string",
              format: "date",
              example: "2024-01-01"
            }
          },
          {
            name: "dateTo",
            in: "query",
            required: false,
            description: "Filter family treasures preserved before this date",
            schema: {
              type: "string",
              format: "date",
              example: "2024-12-31"
            }
          }
        ],
        responses: {
          "200": {
            description: "Search results found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true
                    },
                    data: {
                      "$ref": "#/components/schemas/SearchResults"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid search parameters",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            description: "Search operation failed",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      PreservedTreasure: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Unique identifier for the preserved family treasure",
            example: 123
          },
          filename: {
            type: "string",
            description: "Original filename of the preserved family treasure",
            example: "wedding-photos-1965.zip"
          },
          title: {
            type: "string",
            description: "Title of the family treasure",
            example: "Mama and Papa's Wedding Day"
          },
          description: {
            type: "string",
            description: "Detailed description of the family treasure and its significance",
            example: "Traditional recipes passed down through generations from grandma's kitchen"
          },
          tags: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Heritage tags for organizing and finding family treasures",
            example: ["wedding", "family", "1965", "celebration", "heritage"]
          },
          ipfsHash: {
            type: "string",
            description: "Unique IPFS hash for permanent access to the file",
            example: "bafybeicidexample123456789"
          },
          fileSize: {
            type: "integer",
            description: "File size in bytes",
            example: 45234567
          },
          mimeType: {
            type: "string",
            description: "File MIME type",
            example: "audio/mpeg"
          },
          gatewayUrl: {
            type: "string",
            description: "Public URL for accessing the file via IPFS gateway",
            example: "https://gateway.pinata.cloud/ipfs/bafybeicidexample123456789"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "When the family treasure was first preserved",
            example: "2024-03-15T10:30:00.000Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "When the family treasure was last updated",
            example: "2024-03-15T10:30:00.000Z"
          }
        },
        required: ["id", "filename", "title", "ipfsHash", "fileSize", "mimeType", "createdAt"]
      },
      SearchResults: {
        type: "object",
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 123
                },
                filename: {
                  type: "string",
                  example: "family-recipes.pdf"
                },
                title: {
                  type: "string",
                  example: "Grandma's Recipe Collection"
                },
                description: {
                  type: "string",
                  example: "Traditional recipes passed down through generations from grandma's kitchen"
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  example: ["recipes", "tradition", "cooking", "heritage", "grandma"]
                },
                ipfsHash: {
                  type: "string",
                  example: "bafybeicidexample987654321"
                },
                fileSize: {
                  type: "integer",
                  example: 234567890
                },
                mimeType: {
                  type: "string",
                  example: "video/mp4"
                },
                relevanceScore: {
                  type: "number",
                  description: "Search relevance score (0.0 to 1.0)",
                  example: 0.95
                },
                matchType: {
                  type: "string",
                  enum: ["filename", "title", "description", "tags"],
                  description: "What part of the family treasure matched the search",
                  example: "title"
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2024-02-28T15:45:00.000Z"
                }
              }
            }
          },
          query: {
            type: "string",
            description: "The search query that was executed",
            example: "grandma recipes"
          },
          totalResults: {
            type: "integer",
            description: "Total number of family treasures found",
            example: 15
          },
          searchTime: {
            type: "string",
            description: "Time taken to execute the search",
            example: "23ms"
          }
        },
        required: ["results", "query", "totalResults", "searchTime"]
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "Error code for programmatic handling",
                example: "VALIDATION_ERROR"
              },
              message: {
                type: "string",
                description: "Human-readable error message",
                example: "Invalid file format. Supported formats: images, videos, audio, documents"
              },
              details: {
                type: "object",
                description: "Additional error details when available"
              }
            },
            required: ["code", "message"]
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description: "When the error occurred",
            example: "2024-03-15T10:30:00.000Z"
          }
        },
        required: ["success", "error", "timestamp"]
      }
    }
  },
  tags: [
    {
      name: "System",
      description: "System health and status endpoints"
    },
    {
      name: "Storage",
      description: "IPFS storage and connectivity testing"
    },
    {
      name: "Family Preservation",
      description: "Upload and preserve family treasures permanently"
    },
    {
      name: "Heritage Search",
      description: "Search and discover preserved family heritage"
    }
  ]
};