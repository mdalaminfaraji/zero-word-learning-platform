'use strict';

const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'developer1',
    email: 'developer1@example.com',
    password: 'Developer123!',
    role: 'Developer'
  },
  {
    username: 'developer2',
    email: 'developer2@example.com',
    password: 'Developer123!',
    role: 'Developer'
  },
  {
    username: 'teamlead1',
    email: 'teamlead1@example.com',
    password: 'TeamLead123!',
    role: 'Team Lead'
  },
  {
    username: 'teamlead2',
    email: 'teamlead2@example.com',
    password: 'TeamLead123!',
    role: 'Team Lead'
  },
  {
    username: 'pm1',
    email: 'pm1@example.com',
    password: 'Manager123!',
    role: 'Project Manager'
  },
  {
    username: 'pm2',
    email: 'pm2@example.com',
    password: 'Manager123!',
    role: 'Project Manager'
  },
  {
    username: 'executive1',
    email: 'executive1@example.com',
    password: 'Executive123!',
    role: 'Executive'
  },
  {
    username: 'executive2',
    email: 'executive2@example.com',
    password: 'Executive123!',
    role: 'Executive'
  }
];

async function seed(strapi, userTypes) {
  const createdUsers = [];
  
  // First get the authenticated role
  const authenticatedRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' }});

  if (!authenticatedRole) {
    throw new Error('Authenticated role not found');
  }

  for (const userData of users) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the user with the authenticated role
    const user = await strapi.plugins['users-permissions'].services.user.add({
      ...userData,
      password: hashedPassword,
      provider: 'local',
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,  // Use Strapi's authenticated role
    });

    // Connect user type after creation
    await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: {
        userTypes: {
          connect: [userTypes.find(t => t.name === userData.role).id]
        }
      }
    });

    createdUsers.push(user);
  }

  return createdUsers;
}

module.exports = { seed };
