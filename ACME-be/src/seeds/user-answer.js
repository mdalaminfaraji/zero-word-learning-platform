'use strict';

async function seed(strapi, users, quizzes) {
  const createdAnswers = [];

  // Create some sample answers for each user
  for (const user of users) {
    // Get the user with populated userTypes
    const populatedUser = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
      populate: ['userTypes']
    });

    // Get quizzes appropriate for the user's type
    const userTypeId = populatedUser.userTypes[0]?.id;
    if (!userTypeId) {
      console.log(`Skipping user ${user.id} as they have no user type assigned`);
      continue;
    }

    // Filter quizzes based on user type
    const appropriateQuizzes = quizzes.filter(quiz => {
      return quiz.userTypes && quiz.userTypes.some(type => type.id === userTypeId);
    });

    if (appropriateQuizzes.length === 0) {
      console.log(`No appropriate quizzes found for user ${user.id} with type ${userTypeId}`);
      continue;
    }

    // Create answers for some of the appropriate quizzes
    for (const quiz of appropriateQuizzes.slice(0, 5)) { // First 5 quizzes
      const isCorrect = Math.random() > 0.3; // 70% chance of correct answer

      let userAnswer;
      if (quiz.quizeType === 'singleAnswer') {
        userAnswer = isCorrect ? quiz.answer : (quiz.answer + 1) % 4;
      } else if (quiz.quizeType === 'multipleAnswer') {
        userAnswer = isCorrect ? quiz.answer : [quiz.answer[0], (quiz.answer[0] + 1) % 4];
      } else if (quiz.quizeType === 'imageBased') {
        userAnswer = isCorrect ? quiz.answer : (quiz.answer + 1) % 4;
      } else { // dragAndDrop
        userAnswer = isCorrect ? quiz.answer : quiz.answer.slice().reverse();
      }

      const answer = await strapi.entityService.create('api::user-answer.user-answer', {
        data: {
          answer: userAnswer,
          isCorrect,
          user: user.id,
          quiz: quiz.id
        }
      });

      createdAnswers.push(answer);
    }
  }

  return createdAnswers;
}

module.exports = { seed };
