import { gql } from "@apollo/client";

export const CREATE_USER_ANSWER = gql`
  mutation CreateUserAnswer($data: UserAnswerInput!) {
    createUserAnswer(data: $data) {
      documentId
    }
  }
`;

export const CREATE_QUIZ_MUTATION = gql`
  mutation CreateQuiz($data: QuizInput!) {
    createQuiz(data: $data) {
      title
      duration
      description
      options
      phase
      isActive
      quizeType
      documentId
      createdAt
      publishedAt
    }
  }
`;
