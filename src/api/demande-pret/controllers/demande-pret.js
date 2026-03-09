'use strict';

/**
 * demande-pret controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::demande-pret.demande-pret', ({ strapi }) => ({
    async create(ctx) {
        const email = ctx.request.body.data.email;
        if (!email) {
            return ctx.badRequest('email is missing')
        }

        const message = ctx.request.body.data.message;
        if (!message) {
            return ctx.badRequest('message is missing')
        }

        const objet = ctx.request.body.data.objet;
        if (!objet) {
            return ctx.badRequest('objet is missing')
        }

        let preteurs = await strapi.documents('api::preteur.preteur').findMany({
            fields: ["Email"],
            filters: {
                objets: {
                    Nom: {
                        $eqi: objet,
                    }
                }
            }
        }) ?? [];
        preteurs.push({Email: process.env.RESEND_DEFAULT_REPLY_TO_EMAIL})

        const response = await super.create(ctx);

        if (!response.error) {
            const nomSite = '"Partage sur Châteaubourg"'
            for (const preteur of preteurs) {          
                // To avoid resend rate limit
                await new Promise(resolve => setTimeout(() => resolve(), 600))

                await strapi.plugins.email.services.email.send({
                    to: preteur.Email,
                    subject: `Quelqu'un est à la recherche d'un(e) ${objet}`,
                    text: `
Un utilisateur du site ${nomSite} est à la recherche d'un(e) ${objet}

Sur le même site, vous aviez dit en avoir un(e), ca tombe bien ! 🎉

Lisez le message du demandeur ci dessous et contactez le directement à son adresse email : ${email}

De notre côté notre tâche s'arrête ici 👋, on vous laisse vous organiser librement pour le reste 💬
et on vous dit à bientôt sur ${nomSite} !

--- Message du demandeur ---

${message}

--- Fin du message ---

=> pour lui répondre : ${email}


Bonne journée :-)
                    `,
                });
            }
        }

        return response;
    }
}));

