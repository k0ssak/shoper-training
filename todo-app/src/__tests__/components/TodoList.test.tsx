/**
 * Component tests for TodoList
 *
 * Testy integracyjne dla komponentu TodoList.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { Todo } from '../../types/Todo';

const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 'test-id-1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date('2026-02-01'),
  priority: 'medium',
  ...overrides,
});

describe('TodoList', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
    expect(screen.getByText('Brak zadań do wyświetlenia')).toBeInTheDocument();
  });

  it.todo('should pass correct props to TodoItem');
  it.todo('should render todos in correct order');
});
