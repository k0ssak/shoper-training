import React from 'react';
import { Todo } from '../types/Todo';
import { formatDate, getPriorityLabel } from '../utils/todoUtils';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            data-testid="edit-input"
          />
          <button type="submit" data-testid="save-btn">Zapisz</button>
          <button type="button" onClick={() => setIsEditing(false)} data-testid="cancel-btn">
            Anuluj
          </button>
        </form>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              data-testid="todo-checkbox"
            />
            <span className="todo-text" data-testid="todo-text">{todo.text}</span>
            <span className={`priority-badge priority-${todo.priority}`} data-testid="priority-badge">
              {getPriorityLabel(todo.priority)}
            </span>
            <span className="todo-date" data-testid="todo-date">{formatDate(todo.createdAt)}</span>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} data-testid="edit-btn">
              Edytuj
            </button>
            <button onClick={() => onDelete(todo.id)} data-testid="delete-btn">
              Usuń
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
