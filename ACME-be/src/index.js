'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Subscribe to the lifecycles of the user model
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],
      async afterCreate(event) {
        const { result } = event;
        const userId = result.id;

        // Create initial progress data for the new user
        const progressData = {
          user: userId,
          understanding: true, // Understanding phase is active by default
          developing: false,
          performing: false,
          leading: false,
          understandingAnswerCount: 0,
          understandingScore: 0,
          developingAnswerCount: 0,
          developingScore: 0,
          performingAnswerCount: 0,
          performingScore: 0,
          leadingAnswerCount: 0,
          leadingScore: 0
        };

        // Create user progress record
        await strapi.entityService.create('api::user-progress.user-progress', {
          data: progressData
        });
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const runSeeds = require('./seeds');
    if (process.env.SHOULD_SEED === 'true') {
      return runSeeds(strapi);
    }
  },
};
