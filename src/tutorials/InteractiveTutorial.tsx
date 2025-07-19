import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useTutorial } from './useTutorial';
import { Tutorial } from './types';
import './tutorial-styles.css';

interface InteractiveTutorialProps {
  tutorial: Tutorial;
  onComplete?: () => void;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  tutorial,
  onComplete,
}) => {
  const {
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
  } = useTutorial(tutorial);

  const [showSolution, setShowSolution] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const handleValidate = () => {
    const isValid = validateStep();
    if (isValid && currentStep.nextStepId) {
      setTimeout(() => {
        goToNextStep();
        setShowSolution(false);
      }, 1500);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const stepNumber = getStepNumber();
  const completionPercentage = getCompletionPercentage();
  const achievements = getUnlockedAchievements();

  if (isComplete) {
    return (
      <div className="tutorial-complete">
        <Card className="completion-card">
          <div className="completion-content">
            <h1>🎉 Tutorial Complete!</h1>
            <p>You've successfully completed the {tutorial.title} tutorial.</p>

            <div className="completion-stats">
              <div className="stat">
                <span className="stat-value">{progress.completedSteps.length}</span>
                <span className="stat-label">Steps Completed</span>
              </div>
              <div className="stat">
                <span className="stat-value">{achievements.length}</span>
                <span className="stat-label">Achievements Earned</span>
              </div>
              <div className="stat">
                <span className="stat-value">{tutorial.estimatedTime}m</span>
                <span className="stat-label">Time Invested</span>
              </div>
            </div>

            <div className="achievements-showcase">
              <h3>Your Achievements</h3>
              <div className="achievement-list">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="achievement-item">
                    <span className="achievement-icon">{achievement.icon}</span>
                    <div className="achievement-details">
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="completion-actions">
              <Button variant="primary" onClick={handleComplete}>
                Continue Learning
              </Button>
              <Button variant="outline" onClick={resetTutorial}>
                Restart Tutorial
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="interactive-tutorial">
      <div className="tutorial-header">
        <div className="tutorial-progress">
          <div className="progress-info">
            <span>
              Step {stepNumber.current} of {stepNumber.total}
            </span>
            <span className="progress-percentage">{completionPercentage}% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>

        <div className="tutorial-actions">
          <Button variant="ghost" size="sm" onClick={() => setShowAchievements(!showAchievements)}>
            🏆 {achievements.length}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetTutorial}>
            Reset
          </Button>
        </div>
      </div>

      {showAchievements && achievements.length > 0 && (
        <Card className="achievements-panel">
          <h3>Unlocked Achievements</h3>
          <div className="achievement-list">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <span>{achievement.title}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="tutorial-content">
        <h2>{currentStep.title}</h2>
        <p className="step-content">{currentStep.content}</p>
        <p className="step-instructions">{currentStep.instructions}</p>

        {currentStep.code && (
          <div className="code-example">
            <h3>Example Code</h3>
            <pre className="code-block">
              <code>{currentStep.code}</code>
            </pre>
          </div>
        )}

        <div className="task-section">
          <h3>Your Task</h3>
          <p className="task-description">{currentStep.task}</p>

          <div className="code-editor">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Write your code here..."
              className="code-input"
              rows={10}
              spellCheck={false}
            />
          </div>

          {validationResult && (
            <div className={`validation-result ${validationResult.isValid ? 'valid' : 'invalid'}`}>
              <p className="validation-message">{validationResult.message}</p>
              {validationResult.hints && validationResult.hints.length > 0 && (
                <div className="hints">
                  <p className="hints-title">💡 Hints:</p>
                  <ul>
                    {validationResult.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="action-buttons">
            <Button variant="primary" onClick={handleValidate} disabled={!userCode.trim()}>
              Validate Code
            </Button>

            {currentStep.solution && (
              <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </Button>
            )}

            {stepNumber.current > 1 && (
              <Button variant="ghost" onClick={goToPreviousStep}>
                Previous Step
              </Button>
            )}

            {validationResult?.isValid && currentStep.nextStepId && (
              <Button
                variant="secondary"
                onClick={() => {
                  goToNextStep();
                  setShowSolution(false);
                }}
              >
                Next Step →
              </Button>
            )}
          </div>

          {showSolution && currentStep.solution && (
            <div className="solution-section">
              <h3>Solution</h3>
              <pre className="code-block solution">
                <code>{currentStep.solution}</code>
              </pre>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
