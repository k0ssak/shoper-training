/**
 * Integration tests for App component
 *
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App Integration Tests', () => {
  it('should render the app with header and form', () => {
    render(<App />);

    expect(screen.getByText('📝 Lista Zadań')).toBeInTheDocument();
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
  });

  it('should show empty list message initially', () => {
    render(<App />);

    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
  });

  it('should add a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByTestId('todo-input'), 'Nowe zadanie testowe');
    await user.click(screen.getByTestId('add-btn'));

    expect(screen.getByText('Nowe zadanie testowe')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
  });

  it.todo('should update progress bar when todos are completed');
  it.todo('should clear all completed todos');
  it.todo('should sort todos by priority');
  it.todo('should edit a todo');
});
