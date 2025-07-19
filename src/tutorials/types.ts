export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  instructions: string;
  code: string;
  task: string;
  hints?: string[];
  validation: (userCode: string) => ValidationResult;
  solution?: string;
  nextStepId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  hints?: string[];
}

export interface TutorialProgress {
  currentStepId: string;
  completedSteps: string[];
  startedAt: Date;
  completedAt?: Date;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  tags: string[];
  steps: TutorialStep[];
  achievements: Achievement[];
}
