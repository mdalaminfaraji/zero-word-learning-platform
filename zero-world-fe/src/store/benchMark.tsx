import { create } from "zustand";
import apolloClient from "../../lib/apoloclient";
import { GET_QUIZ_QUERY, GET_USER_PROGRESS } from "@/graphql/query/quiz";
import { CREATE_USER_ANSWER } from "@/graphql/mutation/quiz-mutation";
interface pageType {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
interface QuizType {
  documentId: string;
  title: string;
  quizeType: string;
  options: string[];
  phase: string;
  duration: number;
}
export interface UserProgressObjType {
  Understanding: boolean;
  Developing: boolean;
  Performing: boolean;
  Leading: boolean;
  UnderstandingAnswerCount: number | null;
  UnderstandingScore: number | null;
  DevelopingAnswerCount: number | null;
  DevelopingScore: number | null;
  PerformingAnswerCount: number | null;
  PerformingScore: number | null;
  LeadingAnswerCount: number | null;
  LeadingScore: number | null;
}
interface UserProgressType {
  username: string;
  userProgress: UserProgressObjType | null;
}
interface AssessmentStore {
  userId: string;
  loading: boolean;

  currentPhase: number;
  currentQuestion: number;
  answers: Record<string, string[]>;
  currentQuiz: QuizType[];
  pageInfo: pageType;
  dialogOpen: boolean;
  userProgressData: UserProgressType | null;
  fetchUserProgress: (documentId: string) => Promise<void>;
  getQuiz: (phase?: string) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  moveToNextQuestion: () => void;
  moveToPreviousQuestion: () => void;
  completePhase: (currentPhase: string) => void;
  setDialogOpen: (open: boolean) => void;
  handleFinishPhase: (documentId: string) => void;
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  userId: "",
  loading: false,

  currentPhase: 0,
  currentQuestion: 0,
  dialogOpen: false,
  answers: {},
  currentQuiz: [],
  pageInfo: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    total: 0,
  },
  userProgressData: null,
  fetchUserProgress: async (documentId) => {
    const { data } = await apolloClient.query({
      query: GET_USER_PROGRESS,
      variables: { documentId },
    });
    set({ userProgressData: data.usersPermissionsUser });
  },
  setDialogOpen: (open) => set({ dialogOpen: open }),
  getQuiz: async (phase = "Understanding") => {
    set({ loading: true });
    try {
      const { data } = await apolloClient.query({
        query: GET_QUIZ_QUERY,
        variables: {
          pagination: {
            page: 1,
            pageSize: 30,
          },
          filters: {
            phase: {
              containsi: phase,
            },
          },
        },
      });
      console.log(data);
      const { nodes, pageInfo } = data.quizzes_connection;
      set({ loading: false, currentQuiz: nodes, pageInfo: pageInfo });
    } catch (error) {
      console.error(error);
    }
    console.log(phase);
  },
  handleFinishPhase: async (UserDocumentId) => {
    // Send answers to backend one by one
    set({ loading: true });
    const { answers, setDialogOpen, fetchUserProgress } = get();
    for (const [questionId, answer] of Object.entries(answers)) {
      try {
        await apolloClient.mutate({
          mutation: CREATE_USER_ANSWER,
          variables: {
            data: {
              user: UserDocumentId,
              quiz: questionId,
              userAnswer: answer,
            },
          },
        });
      } catch (error) {
        console.error("Error sending answer:", error);
        set({ loading: false });
        return; // Exit if there's an error
      }
    }
    // Clear answers from localStorage
    localStorage.removeItem("userAnswers");
    // Fetch updated user progress
    await fetchUserProgress(UserDocumentId);
    // Open confirmation modal
    setDialogOpen(true);
    set({ loading: false });
  },
  setAnswer: (questionId, answer) => {
    const { answers } = get();
    const currentAnswer = answers[questionId] || [];
    console.log("currentAnswer", currentAnswer);
    console.log("answer", answer);
    const updatedAnswer = Array.isArray(answer) ? answer : [answer];
    console.log("updatedAnswer", updatedAnswer);
    set((state) => ({
      answers: { ...state.answers, [questionId]: updatedAnswer },
    }));
  },

  moveToNextQuestion: () => {
    const { currentQuiz } = get();
    const totalQuestions = currentQuiz.length;
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, totalQuestions - 1),
    }));
  },

  moveToPreviousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),

  completePhase: async (currentPhase: string) => {
    set({ loading: true });
    try {
      const { userProgressData } = get();
      const { Understanding, Developing, Performing, Leading } =
        userProgressData?.userProgress || {};

      // Determine next phase based on current progress
      let nextPhase = "";
      if (
        Understanding &&
        Developing &&
        currentPhase !== "Developing" &&
        !Performing &&
        !Leading
      ) {
        nextPhase = "Developing";
      } else if (
        Developing &&
        Developing &&
        Performing &&
        currentPhase !== "Performing" &&
        !Leading
      ) {
        nextPhase = "Performing";
      } else if (
        Understanding &&
        Developing &&
        Performing &&
        Leading &&
        currentPhase !== "Leading"
      ) {
        nextPhase = "Leading";
      }

      // Reset state
      set((state) => ({
        currentPhase: state.currentPhase + 1,
        currentQuestion: 0,
        answers: {},
        dialogOpen: false,
      }));

      // Navigate to next phase or benchmark page
      if (nextPhase) {
        window.location.href = `/benchmark/assessment?phase=${nextPhase}`;
      } else {
        window.location.href = "/benchmark";
      }
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
