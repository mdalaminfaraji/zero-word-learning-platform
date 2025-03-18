/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import apolloClient from "../../lib/apoloclient";
import { GET_QUIZ_QUERY } from "@/graphql/query/quiz";
import { CREATE_QUIZ_MUTATION } from "@/graphql/mutation/quiz-mutation";

export interface Quiz {
  documentId?: string;
  title: string;
  quizeType: string;
  options: string[];
  phase: string;
  duration: number;
  isActive: boolean;
  description: string;
  answer?: string[];
}

interface QuizState {
  phase: string;
  questionIndex: number;
  currentQuestion: Quiz | null;
  loading: boolean;
  timeLeft: number;
  quizzes: Quiz[];
  createQuiz: (data: Quiz) => Promise<void>;
  loadQuestion: () => Promise<void>;
  handleNext: (answer: string | string[]) => Promise<void>;
}

const phases = ["Understanding", "Developing", "Performing", "Leading"];

export const useQuizStore = create<QuizState>((set, get) => ({
  phase: "Understanding",
  questionIndex: 0,
  currentQuestion: null,
  loading: false,
  timeLeft: 30,
  quizzes: [],
  createQuiz: async (data: Quiz) => {
    set({ loading: true });
    try {
      const response = await apolloClient.mutate({
        mutation: CREATE_QUIZ_MUTATION,
        variables: {
          data,
        },
      });
      console.log(response);
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error loading quiz:", error);
    }
  },
  loadQuestion: async () => {
    set({ loading: true });
    const { phase, questionIndex } = get();

    try {
      const { data } = await apolloClient.query({
        query: GET_QUIZ_QUERY,
        variables: {
          pagination: {
            page: questionIndex,
            pageSize: 1,
          },
          filters: {
            phase: {
              eq: phase,
            },
          },
        },
      });
      console.log(data);
      set({
        currentQuestion: data.quizzes_connection.nodes[0],
        timeLeft: data.quizzes_connection.nodes[0]?.duration || 30,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error("Error loading quiz:", error);
    }
  },

  handleNext: async (answer) => {
    const { questionIndex, phase, currentQuestion } = get();
    console.log("answer", answer);
    if (!currentQuestion) return;

    try {
      // await apolloClient.mutate({
      //   mutation: SUBMIT_ANSWER_MUTATION,
      //   variables: {
      //     documentId: currentQuestion.documentId,
      //     answer: Array.isArray(answer) ? answer : [answer],
      //   },
      // });

      if (questionIndex + 1 >= 30) {
        const nextPhaseIndex = phases.indexOf(phase) + 1;
        if (nextPhaseIndex < phases.length) {
          set({ phase: phases[nextPhaseIndex], questionIndex: 0 });
        }
      } else {
        set({ questionIndex: questionIndex + 1 });
      }

      get().loadQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  },
}));
