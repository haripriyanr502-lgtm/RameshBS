import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const openApiSpec = {
    openapi: '3.0.3',
    info: {
      title: 'B.S. Ramesh Portfolio & CMS API',
      version: '1.0.0',
      description:
        'Official REST API and CMS Management specification for the Bangalore Siddegowda Ramesh (Ramesh B.S) executive leadership platform, Lions Club Bangalore Brigade, and BSR IT Solutions portfolio.',
      contact: {
        name: 'BSR IT Solutions / RameshBS Administration',
        email: 'bsr@bsrits.com',
        url: 'https://www.lnrameshbs.in',
      },
    },
    servers: [
      {
        url: 'https://www.lnrameshbs.in',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
    tags: [
      { name: 'Public Content', description: 'Public content consumption endpoints' },
      { name: 'Authentication', description: 'Admin session creation, verification, and revocation' },
      { name: 'CMS Content', description: 'Administrative content querying and live publishing' },
      { name: 'Media Management', description: 'Media upload and asset registry management' },
      { name: 'Site Settings', description: 'Global website configuration, SEO, and contact settings' },
      { name: 'User Management', description: 'Administrator and editor account governance' },
    ],
    paths: {
      '/api/content': {
        get: {
          tags: ['Public Content'],
          summary: 'Get published website content',
          description:
            'Retrieves the latest published CMS content merged with default records for public website consumption. Dynamic and non-cached.',
          responses: {
            '200': {
              description: 'Successful retrieval of published content',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/FullCmsDatabase' },
                },
              },
            },
            '500': {
              description: 'Server error retrieving content',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Admin login',
          description:
            'Validates administrator credentials, generates a signed JWT, and attaches the HTTP-only admin_session cookie.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email', example: 'admin@portfolio.com' },
                    password: { type: 'string', format: 'password', example: 'admin123' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Authentication successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Login successful' },
                      user: { $ref: '#/components/schemas/SafeAdminUser' },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          tags: ['Authentication'],
          summary: 'Admin logout',
          description: 'Clears the admin_session cookie and ends the current session.',
          responses: {
            '200': {
              description: 'Logged out successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Logged out successfully' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/me': {
        get: {
          tags: ['Authentication'],
          summary: 'Current session user',
          description: 'Returns the currently authenticated administrator user profile.',
          security: [{ cookieAuth: [] }],
          responses: {
            '200': {
              description: 'Active session returned',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      authenticated: { type: 'boolean', example: true },
                      user: { $ref: '#/components/schemas/SafeAdminUser' },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Not authenticated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/admin/content': {
        get: {
          tags: ['CMS Content'],
          summary: 'Get complete CMS database',
          description: 'Fetches the complete draft and published CMS content database.',
          security: [{ cookieAuth: [] }],
          responses: {
            '200': {
              description: 'Complete CMS document returned',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/FullCmsDatabase' },
                },
              },
            },
            '401': {
              description: 'Unauthorized: Admin session required',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
        post: {
          tags: ['CMS Content'],
          summary: 'Save and publish CMS database',
          description:
            'Saves modified CMS database to durable shared Supabase storage, increments version, and triggers instant Next.js cache revalidation.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/FullCmsDatabase' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Content saved and published successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Website content updated and published successfully' },
                      version: { type: 'number', example: 26 },
                      lastPublishedAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid content payload',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '500': {
              description: 'Failed to persist CMS data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/admin/media': {
        get: {
          tags: ['Media Management'],
          summary: 'Get media assets list',
          description: 'Returns the registry of all uploaded media assets.',
          security: [{ cookieAuth: [] }],
          responses: {
            '200': {
              description: 'Array of media assets',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/MediaAsset' },
                  },
                },
              },
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Media Management'],
          summary: 'Delete media asset',
          description: 'Removes an asset from Supabase Storage and updates the media registry.',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Asset ID to remove',
            },
          ],
          responses: {
            '200': {
              description: 'Media asset deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Media asset deleted successfully' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Asset not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/admin/media/upload': {
        post: {
          tags: ['Media Management'],
          summary: 'Upload media asset',
          description:
            'Uploads an image (JPEG, PNG, WEBP, GIF, SVG) up to 10MB to the Supabase cms-media storage bucket.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['file'],
                  properties: {
                    file: { type: 'string', format: 'binary' },
                    category: {
                      type: 'string',
                      enum: ['Logo', 'Hero', 'Team', 'Meetings', 'Services', 'Achievements', 'Posters', 'General'],
                      default: 'General',
                    },
                    altText: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Upload successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Image uploaded successfully' },
                      asset: { $ref: '#/components/schemas/MediaAsset' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Validation error (unsupported file type or size exceeded)',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '500': {
              description: 'Storage upload failure',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/admin/settings': {
        get: {
          tags: ['Site Settings'],
          summary: 'Get site settings',
          description: 'Returns the global site settings (owner info, SEO keywords, social links).',
          security: [{ cookieAuth: [] }],
          responses: {
            '200': {
              description: 'Site settings returned',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SiteSettings' },
                },
              },
            },
          },
        },
        post: {
          tags: ['Site Settings'],
          summary: 'Update site settings',
          description: 'Updates site settings and triggers live website cache revalidation.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SiteSettings' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Settings saved',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Site settings updated successfully' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/admin/users': {
        get: {
          tags: ['User Management'],
          summary: 'List administrator accounts',
          description: 'Returns all registered administrator accounts with roles and statuses.',
          security: [{ cookieAuth: [] }],
          responses: {
            '200': {
              description: 'List of safe administrator objects',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      users: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/SafeAdminUser' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['User Management'],
          summary: 'Create administrator account',
          description: 'Creates a new administrator or editor account with PBKDF2 password hashing.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    role: { type: 'string', enum: ['admin', 'editor'], default: 'admin' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Admin created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Admin account created successfully.' },
                      user: { $ref: '#/components/schemas/SafeAdminUser' },
                    },
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ['User Management'],
          summary: 'Update admin account',
          description: 'Updates active status, role, or resets password for an existing account.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id', 'action'],
                  properties: {
                    id: { type: 'string' },
                    action: { type: 'string', enum: ['toggle_status', 'change_role', 'reset_password'] },
                    status: { type: 'string', enum: ['active', 'disabled'] },
                    role: { type: 'string', enum: ['owner', 'admin', 'editor'] },
                    password: { type: 'string', minLength: 6 },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Account updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['User Management'],
          summary: 'Delete administrator account',
          description: 'Removes an administrator account from the system.',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id'],
                  properties: {
                    id: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Account deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Administrator account removed successfully.' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'admin_session',
          description: 'Signed HMAC-SHA256 JWT session cookie.',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Unauthorized: Admin session required' },
          },
        },
        SafeAdminUser: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'admin-1' },
            email: { type: 'string', format: 'email', example: 'admin@portfolio.com' },
            role: { type: 'string', enum: ['owner', 'admin', 'editor'], example: 'owner' },
            status: { type: 'string', enum: ['active', 'disabled'], example: 'active' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        MediaAsset: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'med-1727788990' },
            fileName: { type: 'string', example: 'bs_ramesh_profile.jpg' },
            url: { type: 'string', example: 'https://tfylmvdiwjlecgmqbmmi.supabase.co/storage/v1/object/public/cms-media/hero/1727788990-bs_ramesh_profile.jpg' },
            category: { type: 'string', example: 'Hero' },
            mimeType: { type: 'string', example: 'image/jpeg' },
            sizeBytes: { type: 'number', example: 38437 },
            uploadedAt: { type: 'string', format: 'date-time' },
            altText: { type: 'string', example: 'B.S. Ramesh Portrait' },
          },
        },
        SiteSettings: {
          type: 'object',
          properties: {
            siteTitle: { type: 'string' },
            ownerName: { type: 'string' },
            tagline: { type: 'string' },
            shortIntro: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            location: { type: 'string' },
            linkedin: { type: 'string' },
            website: { type: 'string' },
            heroImage: { type: 'string' },
            seoMetaTitle: { type: 'string' },
            seoMetaDescription: { type: 'string' },
            seoKeywords: { type: 'string' },
            lastUpdated: { type: 'string', format: 'date-time' },
          },
        },
        FullCmsDatabase: {
          type: 'object',
          properties: {
            settings: { $ref: '#/components/schemas/SiteSettings' },
            home: { type: 'object' },
            aboutExtras: { type: 'object' },
            projects: { type: 'array', items: { type: 'object' } },
            services: { type: 'array', items: { type: 'object' } },
            career: { type: 'object' },
            lionisticJourney: { type: 'object' },
            meetings: { type: 'array', items: { type: 'object' } },
            team: { type: 'array', items: { type: 'object' } },
            achievements: { type: 'array', items: { type: 'object' } },
            charter: { type: 'array', items: { type: 'object' } },
            media: { type: 'array', items: { $ref: '#/components/schemas/MediaAsset' } },
            version: { type: 'number', example: 25 },
            lastPublishedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}
