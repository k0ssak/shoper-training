/**
 * Component tests for TodoForm
 *
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../../components/TodoForm';

describe('TodoForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with input, select and button', () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('priority-select')).toBeInTheDocument();
    expect(screen.getByTestId('add-btn')).toBeInTheDocument();
  });

  it('should call onAdd with text and priority when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAdd={mockOnAdd} />);

    await user.type(screen.getByTestId('todo-input'), 'Nowe zadanie');
    await user.click(screen.getByTestId('add-btn'));

    expect(mockOnAdd).toHaveBeenCalledWith('Nowe zadanie', 'medium');
  });

  it.todo('should clear error when user starts typing');
  it.todo('should show error for text longer than 200 characters');
});
