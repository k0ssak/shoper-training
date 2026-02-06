/**
 * Component tests for TodoItem
 *
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../components/TodoItem';
import { Todo } from '../../types/Todo';

const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 'test-id-1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date('2026-02-01'),
  priority: 'medium',
  ...overrides,
});

describe('TodoItem', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo text', () => {
    const todo = createMockTodo({ text: 'Kup mleko' });
    render(
      <TodoItem
        todo={todo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByTestId('todo-text')).toHaveTextContent('Kup mleko');
  });

  it('should render checkbox with correct state', () => {
    const todo = createMockTodo({ completed: true });
    render(
      <TodoItem
        todo={todo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = screen.getByTestId('todo-checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it.todo('should cancel editing when Escape is pressed');
  it.todo('should cancel editing when cancel button is clicked');
  it.todo('should apply completed class when todo is completed');
});
