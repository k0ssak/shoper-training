import React from 'react';
import { getCompletionPercentage } from '../utils/todoUtils';
import { Todo } from '../types/Todo';
import './ProgressBar.css';

interface ProgressBarProps {
  todos: Todo[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ todos }) => {
  const percentage = getCompletionPercentage(todos);

  return (
    <div className="progress-container" data-testid="progress-bar">
      <div className="progress-info">
        <span>Postęp</span>
        <span data-testid="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
          data-testid="progress-fill"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
