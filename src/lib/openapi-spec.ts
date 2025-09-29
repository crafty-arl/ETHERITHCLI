export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Black and Brown Memory Archival Family API",
    version: "0.2.0",
    description: "API for preserving and sharing the rich histories and memories of Black and Brown communities through decentralized, secure, and user-friendly technology",
    contact: {
      name: "Memory Archival Family Support",
      url: "https://github.com/your-org/black-brown-memory-archival"
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
        summary: "Archive Family Memory",
        description: "Upload and permanently archive a family memory (photo, video, document, audio) to IPFS with AI-generated metadata",
        tags: ["Memory Archive"],
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
                    description: "The memory file to archive (photos, videos, documents, audio)"
                  },
                  title: {
                    type: "string",
                    description: "Custom title for the memory",
                    example: "Grandma's Stories from the 1960s"
                  },
                  description: {
                    type: "string",
                    description: "Detailed description of the memory",
                    example: "Oral history recordings of grandmother sharing stories about growing up in the South during the civil rights era"
                  },
                  tags: {
                    type: "string",
                    description: "Comma-separated tags for organizing memories",
                    example: "oral-history,grandmother,civil-rights,family-stories,1960s"
                  }
                },
                required: ["file"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Memory successfully archived",
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
                      "$ref": "#/components/schemas/ArchivedMemory"
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
        summary: "Search Family Memories",
        description: "Search through archived family memories by content, family members, events, or cultural context",
        tags: ["Memory Search"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Search query (family member, event, cultural context, or any memorable detail)",
            schema: {
              type: "string",
              example: "grandmother stories"
            }
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum number of results to return",
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
            description: "Filter by specific tags (comma-separated)",
            schema: {
              type: "string",
              example: "oral-history,family-stories"
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
            description: "Filter memories added after this date",
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
            description: "Filter memories added before this date",
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
      ArchivedMemory: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Unique identifier for the archived memory",
            example: 123
          },
          filename: {
            type: "string",
            description: "Original filename of the archived memory",
            example: "grandma-stories-1960s.mp3"
          },
          title: {
            type: "string",
            description: "Title of the memory",
            example: "Grandma's Stories from the 1960s"
          },
          description: {
            type: "string",
            description: "Detailed description of the memory",
            example: "Oral history recordings of grandmother sharing stories about growing up in the South during the civil rights era"
          },
          tags: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Tags for organizing and finding the memory",
            example: ["oral-history", "grandmother", "civil-rights", "family-stories", "1960s"]
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
            description: "When the memory was first archived",
            example: "2024-03-15T10:30:00.000Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "When the memory was last updated",
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
                  example: "family-reunion-2023.mp4"
                },
                title: {
                  type: "string",
                  example: "Johnson Family Reunion 2023"
                },
                description: {
                  type: "string",
                  example: "Annual family gathering with three generations celebrating together"
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  example: ["family-reunion", "celebration", "multi-generational", "2023"]
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
                  description: "What part of the memory matched the search",
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
            example: "family reunion"
          },
          totalResults: {
            type: "integer",
            description: "Total number of memories found",
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
      name: "Memory Archive",
      description: "Upload and archive family memories permanently"
    },
    {
      name: "Memory Search",
      description: "Search and discover archived family memories"
    }
  ]
};