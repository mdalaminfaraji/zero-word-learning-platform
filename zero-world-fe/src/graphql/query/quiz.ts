import { gql } from "@apollo/client";

export const GET_QUIZ_QUERY = gql`
  query Quizzes_connection(
    $pagination: PaginationArg
    $filters: QuizFiltersInput
  ) {
    quizzes_connection(pagination: $pagination, filters: $filters) {
      nodes {
        documentId
        title
        quizeType
        options
        phase
        duration
      }
      pageInfo {
        page
        pageCount
        pageSize
        total
      }
    }
  }
`;

export const GET_QUIZ_BY_SPECIFIC_PHASE = gql`
  query Phase($documentId: ID!, $pagination: PaginationArg) {
    phase(documentId: $documentId) {
      name
      quizzes_connection(pagination: $pagination) {
        nodes {
          documentId
          title
          options
        }
      }
    }
  }
`;
export const GET_PHASES = gql`
  query Phases {
    phases(sort: ["order:asc"]) {
      documentId
      name
      order
    }
  }
`;
export const GET_USER_PROGRESS = gql`
  query UsersPermissionsUser($documentId: ID!) {
    usersPermissionsUser(documentId: $documentId) {
      username
      userProgress {
        Understanding
        Developing
        Performing
        Leading
        UnderstandingAnswerCount
        UnderstandingScore
        DevelopingAnswerCount
        DevelopingScore
        PerformingAnswerCount
        PerformingScore
        LeadingAnswerCount
        LeadingScore
      }
    }
  }
`;
