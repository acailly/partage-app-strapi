module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Ensuring API tokens are visible in the admin panel
  // https://docs.strapi.io/cms/features/api-tokens#ensuring-api-tokens-are-visible-in-the-admin-panel
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  }
});
