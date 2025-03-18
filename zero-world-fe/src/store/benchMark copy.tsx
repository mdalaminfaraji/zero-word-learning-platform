// src/types/assessment.ts
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Phase {
  id: string;
  name: string;
  status: "locked" | "in_progress" | "completed";
  questions: Question[];
}

// src/data/mockData.ts
export const assessmentData: Phase[] = [
  {
    id: "understanding",
    name: "Understanding",
    status: "in_progress",
    questions: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1} about understanding phase`,
      options: [
        { id: "a", text: "Option A for question " + (i + 1) },
        { id: "b", text: "Option B for question " + (i + 1) },
        { id: "c", text: "Option C for question " + (i + 1) },
        { id: "d", text: "Option D for question " + (i + 1) },
      ],
    })),
  },
  {
    id: "developing",
    name: "Developing",
    status: "locked",
    questions: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1} about developing phase`,
      options: [
        { id: "a", text: "Option A for question " + (i + 1) },
        { id: "b", text: "Option B for question " + (i + 1) },
        { id: "c", text: "Option C for question " + (i + 1) },
        { id: "d", text: "Option D for question " + (i + 1) },
      ],
    })),
  },
  {
    id: "applying",
    name: "Applying",
    status: "locked",
    questions: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1} about applying phase`,
      options: [
        { id: "a", text: "Option A for question " + (i + 1) },
        { id: "b", text: "Option B for question " + (i + 1) },
        { id: "c", text: "Option C for question " + (i + 1) },
        { id: "d", text: "Option D for question " + (i + 1) },
      ],
    })),
  },
  {
    id: "mastering",
    name: "Mastering",
    status: "locked",
    questions: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1} about mastering phase`,
      options: [
        { id: "a", text: "Option A for question " + (i + 1) },
        { id: "b", text: "Option B for question " + (i + 1) },
        { id: "c", text: "Option C for question " + (i + 1) },
        { id: "d", text: "Option D for question " + (i + 1) },
      ],
    })),
  },
];

// src/store/assessmentStore.ts
import { create } from "zustand";
import apolloClient from "../../lib/apoloclient";
import { GET_QUIZ_QUERY } from "@/graphql/query/quiz";
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
interface AssessmentStore {
  loading: boolean;
  phases: Phase[];
  currentPhase: number;
  currentQuestion: number;
  answers: Record<string, string>;
  currentQuiz: QuizType[];
  pageInfo: pageType;
  getQuiz: (phase?: string) => void;
  setAnswer: (questionId: string, answer: string) => void;
  moveToNextQuestion: () => void;
  moveToPreviousQuestion: () => void;
  completePhase: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  loading: false,
  phases: assessmentData,
  currentPhase: 0,
  currentQuestion: 0,
  answers: {},
  currentQuiz: [],
  pageInfo: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    total: 0,
  },
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
              eq: phase,
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
  setAnswer: (questionId, answer) => {
    const { answers } = get();
    console.log("answers", answers);
    console.log("answer", answer);
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
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

  completePhase: () => {
    set((state) => {
      const newPhases = [...state.phases];
      console.log(newPhases);
      newPhases[state.currentPhase].status = "completed";
      if (state.currentPhase < 3) {
        newPhases[state.currentPhase + 1].status = "in_progress";
      }

      return {
        phases: newPhases,
        currentPhase: state.currentPhase + 1,
        currentQuestion: 0,
        answers: {},
      };
    });
  },
}));
