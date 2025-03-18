export interface ProgressItem {
  title: string;
  score: number;
  count: number;
  color: string;
  icon: string;
}

export interface TaskProgress {
  title: string;
  progress: number;
}

export interface CourseProgress {
  id: string;
  title: string;
  module: string;
  instructor: string;
  progress: number;
  status: "not-started" | "on-going";
}

export interface ActivityData {
  day: string;
  hours: number;
}
