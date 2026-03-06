'use strict';

/**
 * proposition-pret controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::proposition-pret.proposition-pret');

module.exports = createCoreController('api::proposition-pret.proposition-pret', ({ strapi }) => ({
    async create(ctx) {
        const email = ctx.request.body.data.email;
        if (!email) {
            return ctx.badRequest('email is missing')
        }

        const message = ctx.request.body.data.message;
        if (!message) {
            return ctx.badRequest('message is missing')
        }

        const response = await super.create(ctx);

        if (!response.error) {
            await strapi.plugins.email.services.email.send({
                to: process.env.RESEND_DEFAULT_REPLY_TO_EMAIL,
                subject: "Nouvelle proposition de prêt",
                text: `Email : ${email}\n\nMessage : ${message}`,
            });
        }

        return response;
    }
}));
