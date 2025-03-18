'use strict';

async function seed(strapi, users) {
  const createdProgress = [];

  for (const user of users) {
    // Create initial progress for each user
    const progress = await strapi.entityService.create('api::user-progress.user-progress', {
      data: {
        Understanding: true,
        Developing: false,
        Performing: false,
        Leading: false,
        UnderstandingAnnswerCount: 0,
        UnderstandingScore: 0,
        DevelopingAnswerCount: 0,
        DevelopingScore: 0,
        PerformingAnswerCount: 0,
        PerformingScore: 0,
        LeadingAnswerCount: 0,
        LeadingScore: 0,
        user: {
          connect: [user.id]
        }
      }
    });

    createdProgress.push(progress);
  }

  return createdProgress;
}

module.exports = { seed };
