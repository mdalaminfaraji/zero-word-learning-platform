// @ts-nocheck
'use strict';

const quizSeeder = require('./quiz');
const userSeeder = require('./user');
const userProgressSeeder = require('./user-progress');
const userAnswerSeeder = require('./user-answer');

async function runSeeds(strapi) {
  try {
    console.log('Starting database seeding...');
    
    // 1. Create user types first
    console.log('Creating user types...');
    const userTypes = [
      { name: 'Developer' },
      { name: 'Team Lead' },
      { name: 'Project Manager' },
      { name: 'Executive' }
    ];

    const createdUserTypes = [];
    for (const userType of userTypes) {
      const created = await strapi.entityService.create('api::user-type.user-type', {
        data: userType
      });
      createdUserTypes.push(created);
      console.log(`Created user type: ${userType.name}`);
    }

    // 2. Create users
    console.log('Creating users...');
    const users = await userSeeder.seed(strapi, createdUserTypes);
    console.log(`Created ${users.length} users`);

    // 3. Create quizzes
    console.log('Creating quizzes...');
    const quizzes = await quizSeeder.seed(strapi, createdUserTypes);
    console.log(`Created ${quizzes.length} quizzes`);

    // 4. Create user progress
    console.log('Creating user progress...');
    await userProgressSeeder.seed(strapi, users);
    console.log('User progress created');

    // 5. Create some sample user answers
    console.log('Creating sample user answers...');
    await userAnswerSeeder.seed(strapi, users, quizzes);
    console.log('Sample user answers created');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}

module.exports = runSeeds;