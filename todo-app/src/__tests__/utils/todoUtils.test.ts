/**
 * Unit tests for todoUtils utility functions
 *
 */

import {
  generateId,
  createTodo,
  toggleTodo,
  updateTodoText,
  filterTodos,
  sortTodos,
  countTodos,
  searchTodos,
  validateTodoText,
  clearCompleted,
  toggleAllTodos,
  getTodosByPriority,
  getCompletionPercentage,
  isOverdue,
  formatDate,
  getPriorityLabel,
} from '../../utils/todoUtils';
import { Todo } from '../../types/Todo';

// Przykładowe dane testowe
const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 'test-id-1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date('2026-02-01'),
  priority: 'medium',
  ...overrides,
});

describe('todoUtils', () => {
  describe('generateId', () => {
    it('should generate a unique string id', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('createTodo', () => {
    it('should create a todo with the given text', () => {
      const todo = createTodo('Kup mleko');
      expect(todo.text).toBe('Kup mleko');
      expect(todo.completed).toBe(false);
      expect(todo.priority).toBe('medium');
    });
  });

  describe('toggleTodo', () => {
    it('should toggle completed from false to true', () => {
      const todo = createMockTodo({ completed: false });
      const toggled = toggleTodo(todo);
      expect(toggled.completed).toBe(true);
    });
  });

  describe('sortTodos', () => {
    it.todo('should sort by date (newest first)');
    it.todo('should sort by priority (high first)');
    it.todo('should sort alphabetically');
  });

  describe('clearCompleted', () => {
    it.todo('should remove all completed todos');
    it.todo('should keep all active todos');
  });
});
