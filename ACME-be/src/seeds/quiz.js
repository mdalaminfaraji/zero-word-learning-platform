'use strict';

const quizTemplates = {
  Understanding: [
    {
      title: "Project Management Fundamentals",
      description: "Test your understanding of basic project management concepts",
      questions: [
        "What is the primary purpose of project scope management?",
        "How do you identify project stakeholders?",
        "What are the key components of a project charter?",
        "Explain the importance of project milestones"
      ],
      forUserTypes: [0, 1, 2] // Developer, Team Lead, Project Manager
    },
    {
      title: "Team Communication Essentials",
      description: "Evaluate your knowledge of effective team communication",
      questions: [
        "What are the key elements of effective team communication?",
        "How do you handle communication barriers in a team?",
        "What makes a good feedback session?",
        "Describe the importance of active listening"
      ],
      forUserTypes: [1, 2] // Team Lead, Project Manager
    }
  ],
  Developing: [
    {
      title: "Technical Leadership Skills",
      description: "Assess your technical leadership capabilities",
      questions: [
        "How do you mentor junior developers?",
        "What's your approach to code review?",
        "How do you handle technical debt?",
        "Explain your branching strategy"
      ],
      forUserTypes: [0, 1] // Developer, Team Lead
    },
    {
      title: "Team Performance Management",
      description: "Test your ability to manage team performance",
      questions: [
        "How do you measure team productivity?",
        "What metrics do you use for code quality?",
        "How do you handle underperforming team members?",
        "Describe your sprint planning process"
      ],
      forUserTypes: [1, 2] // Team Lead, Project Manager
    }
  ],
  Performing: [
    {
      title: "Project Risk Management",
      description: "Evaluate your risk management skills",
      questions: [
        "How do you identify project risks?",
        "What's your risk mitigation strategy?",
        "How do you handle scope creep?",
        "Describe your change management process"
      ],
      forUserTypes: [2, 3] // Project Manager, Executive
    },
    {
      title: "Resource Optimization",
      description: "Test your resource management capabilities",
      questions: [
        "How do you optimize team allocation?",
        "What's your approach to budget management?",
        "How do you handle resource conflicts?",
        "Describe your capacity planning process"
      ],
      forUserTypes: [1, 2, 3] // Team Lead, Project Manager, Executive
    }
  ],
  Leading: [
    {
      title: "Strategic Leadership",
      description: "Assess your strategic leadership skills",
      questions: [
        "How do you align team goals with business objectives?",
        "What's your approach to organizational change?",
        "How do you foster innovation?",
        "Describe your leadership style"
      ],
      forUserTypes: [2, 3] // Project Manager, Executive
    },
    {
      title: "Executive Decision Making",
      description: "Evaluate your decision-making capabilities",
      questions: [
        "How do you make decisions under uncertainty?",
        "What factors do you consider in strategic planning?",
        "How do you handle stakeholder management?",
        "Describe your approach to risk vs. reward"
      ],
      forUserTypes: [3] // Executive
    }
  ]
};

async function createQuiz(strapi, template, phase, index, userTypes) {
  const quizTypes = ['singleAnswer', 'multipleAnswer', 'imageBased', 'dragAndDrop'];
  const quizType = quizTypes[Math.floor(Math.random() * quizTypes.length)];
  
  let options, answer;
  if (quizType === 'singleAnswer' || quizType === 'multipleAnswer') {
    const questionIndex = index % template.questions.length;
    options = {
      choices: [
        `Correct: ${template.questions[questionIndex]}`,
        `Alternative 1: ${template.questions[questionIndex]}`,
        `Alternative 2: ${template.questions[questionIndex]}`,
        `Alternative 3: ${template.questions[questionIndex]}`
      ]
    };
    answer = quizType === 'singleAnswer' ? 0 : [0, 1];
  } else if (quizType === 'imageBased') {
    options = {
      images: [
        'correct-diagram.jpg',
        'incorrect-diagram1.jpg',
        'incorrect-diagram2.jpg',
        'incorrect-diagram3.jpg'
      ],
      descriptions: template.questions
    };
    answer = 0;
  } else {
    options = {
      items: template.questions,
      positions: ['First', 'Second', 'Third', 'Fourth']
    };
    answer = [0, 1, 2, 3];
  }

  const selectedUserTypes = template.forUserTypes.map(index => userTypes[index].id);

  return strapi.entityService.create('api::quiz.quiz', {
    data: {
      title: `${template.title} - Quiz ${index + 1}`,
      description: template.description,
      quizeType: quizType,
      options,
      phase,
      duration: Math.floor(Math.random() * 15) + 15, // 15-30 minutes
      answer,
      isActive: true,
      userTypes: {
        connect: selectedUserTypes
      }
    }
  });
}

async function seed(strapi, userTypes) {
  try {
    console.log('Starting quiz seeding...');
    const createdQuizzes = [];

    // Create Understanding phase quizzes (30)
    console.log('Creating Understanding phase quizzes...');
    for (let i = 0; i < 30; i++) {
      const template = quizTemplates.Understanding[i % quizTemplates.Understanding.length];
      const quiz = await createQuiz(strapi, template, 'Understanding', i, userTypes);
      const populatedQuiz = await strapi.entityService.findOne('api::quiz.quiz', quiz.id, {
        populate: ['userTypes']
      });
      createdQuizzes.push(populatedQuiz);
    }

    // Create remaining quizzes (20) distributed across other phases
    console.log('Creating quizzes for other phases...');
    const otherPhases = ['Developing', 'Performing', 'Leading'];
    for (let i = 0; i < 20; i++) {
      const phase = otherPhases[i % otherPhases.length];
      const template = quizTemplates[phase][i % quizTemplates[phase].length];
      const quiz = await createQuiz(strapi, template, phase, i, userTypes);
      const populatedQuiz = await strapi.entityService.findOne('api::quiz.quiz', quiz.id, {
        populate: ['userTypes']
      });
      createdQuizzes.push(populatedQuiz);
    }

    console.log('Quiz seeding completed successfully!');
    return createdQuizzes;
  } catch (error) {
    console.error('Error seeding quizzes:', error);
    throw error;
  }
}

module.exports = { seed };
