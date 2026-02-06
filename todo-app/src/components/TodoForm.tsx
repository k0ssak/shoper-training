import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { validateTodoText } from '../utils/todoUtils';
import './TodoForm.css';

interface TodoFormProps {
  onAdd: (text: string, priority: Todo['priority']) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateTodoText(text);

    if (!validation.isValid) {
      setError(validation.error || 'Nieprawidłowe dane');
      return;
    }

    onAdd(text, priority);
    setText('');
    setPriority('medium');
    setError(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form" data-testid="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Co chcesz zrobić?"
          data-testid="todo-input"
          className={error ? 'error' : ''}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo['priority'])}
          data-testid="priority-select"
        >
          <option value="low">Niski priorytet</option>
          <option value="medium">Średni priorytet</option>
          <option value="high">Wysoki priorytet</option>
        </select>
        <button type="submit" data-testid="add-btn">
          Dodaj
        </button>
      </div>
      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}
    </form>
  );
};

export default TodoForm;
