module.exports = ({env}) => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"),
      },
      settings: {
        defaultFrom: env("RESEND_DEFAULT_FROM_EMAIL"),
        defaultReplyTo: env("RESEND_DEFAULT_REPLY_TO_EMAIL"),
      },
    },
  },
});
