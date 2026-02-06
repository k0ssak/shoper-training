import { Todo, FilterType, SortType } from '../types/Todo';

/**
 * Generates a unique ID for a todo item
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates a new todo item
 */
export const createTodo = (text: string, priority: Todo['priority'] = 'medium'): Todo => {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
    priority,
  };
};

/**
 * Toggles the completed status of a todo
 */
export const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    completed: !todo.completed,
  };
};

/**
 * Updates the text of a todo
 */
export const updateTodoText = (todo: Todo, newText: string): Todo => {
  return {
    ...todo,
    text: newText.trim(),
  };
};

/**
 * Filters todos based on filter type
 */
export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

/**
 * Sorts todos based on sort type
 */
export const sortTodos = (todos: Todo[], sortType: SortType): Todo[] => {
  const todosCopy = [...todos];

  switch (sortType) {
    case 'date':
      return todosCopy.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return todosCopy.sort((a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    case 'alphabetical':
      return todosCopy.sort((a, b) =>
        a.text.toLowerCase().localeCompare(b.text.toLowerCase())
      );
    default:
      return todosCopy;
  }
};

/**
 * Counts todos by completion status
 */
export const countTodos = (todos: Todo[]): { total: number; active: number; completed: number } => {
  const completed = todos.filter((todo) => todo.completed).length;
  return {
    total: todos.length,
    active: todos.length - completed,
    completed,
  };
};

/**
 * Searches todos by text
 */
export const searchTodos = (todos: Todo[], searchTerm: string): Todo[] => {
  if (!searchTerm.trim()) {
    return todos;
  }
  const lowerSearchTerm = searchTerm.toLowerCase();
  return todos.filter((todo) =>
    todo.text.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Validates todo text
 */
export const validateTodoText = (text: string): { isValid: boolean; error?: string } => {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return { isValid: false, error: 'Todo text cannot be empty' };
  }

  if (trimmedText.length < 3) {
    return { isValid: false, error: 'Todo text must be at least 3 characters long' };
  }

  if (trimmedText.length > 200) {
    return { isValid: false, error: 'Todo text cannot exceed 200 characters' };
  }

  return { isValid: true };
};

/**
 * Clears all completed todos
 */
export const clearCompleted = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => !todo.completed);
};

/**
 * Marks all todos as completed or active
 */
export const toggleAllTodos = (todos: Todo[], completed: boolean): Todo[] => {
  return todos.map((todo) => ({ ...todo, completed }));
};

/**
 * Gets todos by priority
 */
export const getTodosByPriority = (todos: Todo[], priority: Todo['priority']): Todo[] => {
  return todos.filter((todo) => todo.priority === priority);
};

/**
 * Calculates completion percentage
 */
export const getCompletionPercentage = (todos: Todo[]): number => {
  if (todos.length === 0) {
    return 0;
  }
  const completed = todos.filter((todo) => todo.completed).length;
  return Math.round((completed / todos.length) * 100);
};

/**
 * Checks if a todo is overdue (created more than 7 days ago and not completed)
 */
export const isOverdue = (todo: Todo, daysThreshold: number = 7): boolean => {
  if (todo.completed) {
    return false;
  }
  const now = new Date();
  const createdAt = new Date(todo.createdAt);
  const diffTime = now.getTime() - createdAt.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays > daysThreshold;
};

/**
 * Formats date for display
 */
export const formatDate = (date: Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Gets priority label in Polish
 */
export const getPriorityLabel = (priority: Todo['priority']): string => {
  const labels = {
    low: 'Niski',
    medium: 'Średni',
    high: 'Wysoki',
  };
  return labels[priority];
};
