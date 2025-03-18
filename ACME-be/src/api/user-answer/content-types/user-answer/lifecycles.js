module.exports = {
  afterCreate: async (event) => {
    const { result, params } = event;
    const { quiz: quizId, userAnswer,user } = params.data;
    const userId = user?.set[0]?.id;
    console.log("Data received:", { result, quizId, userAnswer, userId});
    try {

      // Get the quiz details
      const quiz = await strapi.entityService.findOne('api::quiz.quiz', quizId?.set[0]?.id);
      console.log("quiz answer", quiz)
      if (!quiz || !quiz.answer) {
        console.log("didn't find quiz or answer")
        // If quiz or answer not found, mark as incorrect
        await strapi.entityService.update('api::user-answer.user-answer', result.id, {
          data: {
            isCorrect: false
          }
        });
        return;
      }

      // Compare the answers
      let isCorrect = false;
      try {
        // Direct comparison of JSON structures
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(quiz.answer);
      } catch (error) {
        console.log(error)
        // If there's any error in comparison, mark as incorrect
        isCorrect = false;
      }

      // Update the isCorrect field with true/false
      await strapi.entityService.update('api::user-answer.user-answer', result.id, {
        data: {
          isCorrect: isCorrect
        }
      });
      try {
        // Find existing progress for this user by userId
        const existingProgress = await strapi.db.query('api::user-progress.user-progress').findOne({
          where: {
            user: userId
          }
        });

        console.log(existingProgress)

        if (existingProgress) {
          // Get the current phase from quiz
          const phaseName = quiz.phase || 'Understanding';
          
          // Prepare update data based on the phase
          const updateData = {
            [`${phaseName}AnswerCount`]: (existingProgress[`${phaseName}AnswerCount`] || 0) + 1,
            [`${phaseName}Score`]: (existingProgress[`${phaseName}Score`] || 0) + (isCorrect ? 1 : 0)
          };

          // Calculate progress percentage for current phase
          const currentScore = updateData[`${phaseName}Score`];
          const totalAnswers = updateData[`${phaseName}AnswerCount`];
          const progressPercentage = (currentScore / 30) * 100;

          // Check if minimum answer requirement is met (30 answers) and score is 80% or higher
          if (totalAnswers >= 30 && progressPercentage >= 80) {
            // Progress to next phase based on current phase
            switch(phaseName) {
              case 'Understanding':
                if (!existingProgress.Developing) {
                  updateData.Developing = true;
                }
                break;
              case 'Developing':
                if (!existingProgress.Performing) {
                  updateData.Performing = true;
                }
                break;
              case 'Performing':
                if (!existingProgress.Leading) {
                  updateData.Leading = true;
                }
                break;
            }
          }

          // If this is the first correct answer in this phase, mark the phase as active
          if (isCorrect && !existingProgress[phaseName]) {
            updateData[phaseName] = true;
          }

          // Update progress
          await strapi.entityService.update('api::user-progress.user-progress', existingProgress.id, {
            data: updateData
          });
        } else {
          // Create new progress with initial phase data
          const progressData = {
            user: userId,
            understandingAnswerCount: 1,
            understandingScore: isCorrect ? 1 : 0,
            developingAnswerCount: 0,
            developingScore: 0,
            performingAnswerCount: 0,
            performingScore: 0,
            leadingAnswerCount: 0,
            leadingScore: 0
          };

          await strapi.entityService.create('api::user-progress.user-progress', {
            data: progressData
          });
        }
      } catch (progressError) {
        console.error("Error handling user progress:", progressError);
      }
    } catch (error) {
      console.log("first error", error)
      // If any error occurs, ensure we mark the answer as incorrect
      await strapi.entityService.update('api::user-answer.user-answer', result.id, {
        data: {
          isCorrect: false
        }
      });
      // Re-throw the error for logging
      throw error;
    }
  }
};
