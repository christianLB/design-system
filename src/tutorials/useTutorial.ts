import { useState, useEffect, useCallback } from 'react';
import { Tutorial, TutorialProgress, TutorialStep, Achievement } from './types';

interface UseTutorialReturn {
  tutorial: Tutorial;
  currentStep: TutorialStep;
  progress: TutorialProgress;
  userCode: string;
  validationResult: { isValid: boolean; message: string; hints?: string[] } | null;
  isComplete: boolean;
  setUserCode: (code: string) => void;
  validateStep: () => boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetTutorial: () => void;
  getStepNumber: () => { current: number; total: number };
  getCompletionPercentage: () => number;
  getUnlockedAchievements: () => Achievement[];
}

const STORAGE_KEY_PREFIX = 'tutorial_progress_';

export function useTutorial(tutorial: Tutorial): UseTutorialReturn {
  const storageKey = `${STORAGE_KEY_PREFIX}${tutorial.id}`;

  // Load saved progress or create new
  const loadProgress = (): TutorialProgress => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          completedAt: parsed.completedAt ? new Date(parsed.completedAt) : undefined,
          achievements: parsed.achievements.map((a: any) => ({
            ...a,
            unlockedAt: new Date(a.unlockedAt),
          })),
        };
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }

    return {
      currentStepId: tutorial.steps[0].id,
      completedSteps: [],
      startedAt: new Date(),
      achievements: [],
    };
  };

  const [progress, setProgress] = useState<TutorialProgress>(loadProgress);
  const [userCode, setUserCode] = useState('');
  const [validationResult, setValidationResult] =
    useState<UseTutorialReturn['validationResult']>(null);

  // Get current step
  const currentStep =
    tutorial.steps.find((step) => step.id === progress.currentStepId) || tutorial.steps[0];

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  // Validate current step
  const validateStep = useCallback(() => {
    const result = currentStep.validation(userCode);
    setValidationResult(result);

    if (result.isValid && !progress.completedSteps.includes(currentStep.id)) {
      // Mark step as completed
      setProgress((prev) => ({
        ...prev,
        completedSteps: [...prev.completedSteps, currentStep.id],
      }));

      // Check for achievements
      checkAchievements(currentStep.id);
    }

    return result.isValid;
  }, [currentStep, userCode, progress.completedSteps]);

  // Check and unlock achievements
  const checkAchievements = (completedStepId: string) => {
    const newAchievements: Achievement[] = [];

    // First button achievement
    if (completedStepId === 'button-variants' && !hasAchievement('first-button')) {
      newAchievements.push({
        ...tutorial.achievements.find((a) => a.id === 'first-button')!,
        unlockedAt: new Date(),
      });
    }

    // Card creator achievement
    if (completedStepId === 'card-basics' && !hasAchievement('card-creator')) {
      newAchievements.push({
        ...tutorial.achievements.find((a) => a.id === 'card-creator')!,
        unlockedAt: new Date(),
      });
    }

    // Component composer achievement
    if (completedStepId === 'combining-components' && !hasAchievement('component-composer')) {
      newAchievements.push({
        ...tutorial.achievements.find((a) => a.id === 'component-composer')!,
        unlockedAt: new Date(),
      });
    }

    // Tutorial complete achievement
    if (completedStepId === 'complete' && !hasAchievement('tutorial-complete')) {
      newAchievements.push({
        ...tutorial.achievements.find((a) => a.id === 'tutorial-complete')!,
        unlockedAt: new Date(),
      });
    }

    if (newAchievements.length > 0) {
      setProgress((prev) => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements],
      }));
    }
  };

  const hasAchievement = (achievementId: string): boolean => {
    return progress.achievements.some((a) => a.id === achievementId);
  };

  // Navigation functions
  const goToNextStep = useCallback(() => {
    if (currentStep.nextStepId) {
      setProgress((prev) => ({
        ...prev,
        currentStepId: currentStep.nextStepId!,
      }));
      setUserCode('');
      setValidationResult(null);

      // Mark tutorial as complete if this was the last step
      if (currentStep.id === 'complete') {
        setProgress((prev) => ({
          ...prev,
          completedAt: new Date(),
        }));
      }
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = tutorial.steps.findIndex((step) => step.id === currentStep.id);
    if (currentIndex > 0) {
      const previousStep = tutorial.steps[currentIndex - 1];
      setProgress((prev) => ({
        ...prev,
        currentStepId: previousStep.id,
      }));
      setUserCode('');
      setValidationResult(null);
    }
  }, [currentStep, tutorial.steps]);

  // Reset tutorial
  const resetTutorial = useCallback(() => {
    setProgress({
      currentStepId: tutorial.steps[0].id,
      completedSteps: [],
      startedAt: new Date(),
      achievements: [],
    });
    setUserCode('');
    setValidationResult(null);
    localStorage.removeItem(storageKey);
  }, [tutorial.steps, storageKey]);

  // Helper functions
  const getStepNumber = useCallback(() => {
    const currentIndex = tutorial.steps.findIndex((step) => step.id === currentStep.id);
    return {
      current: currentIndex + 1,
      total: tutorial.steps.length,
    };
  }, [currentStep, tutorial.steps]);

  const getCompletionPercentage = useCallback(() => {
    return Math.round((progress.completedSteps.length / tutorial.steps.length) * 100);
  }, [progress.completedSteps.length, tutorial.steps.length]);

  const getUnlockedAchievements = useCallback(() => {
    return progress.achievements;
  }, [progress.achievements]);

  const isComplete = progress.completedAt !== undefined;

  return {
    tutorial,
    currentStep,
    progress,
    userCode,
    validationResult,
    isComplete,
    setUserCode,
    validateStep,
    goToNextStep,
    goToPreviousStep,
    resetTutorial,
    getStepNumber,
    getCompletionPercentage,
    getUnlockedAchievements,
  };
}
