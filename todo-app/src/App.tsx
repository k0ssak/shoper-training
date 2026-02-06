import React, { useState, useMemo } from 'react';
import { Todo, FilterType, SortType } from './types/Todo';
import {
  createTodo,
  toggleTodo,
  updateTodoText,
  filterTodos,
  sortTodos,
  searchTodos,
  countTodos,
  clearCompleted,
} from './utils/todoUtils';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import ProgressBar from './components/ProgressBar';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('date');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = (text: string, priority: Todo['priority']) => {
    const newTodo = createTodo(text, priority);
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? toggleTodo(todo) : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updateTodoText(todo, newText) : todo))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => clearCompleted(prev));
  };

  const stats = useMemo(() => countTodos(todos), [todos]);

  const displayedTodos = useMemo(() => {
    let result = todos;
    result = searchTodos(result, searchTerm);
    result = filterTodos(result, filter);
    result = sortTodos(result, sortType);
    return result;
  }, [todos, searchTerm, filter, sortType]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Lista Zadań</h1>
        <p>Organizuj swoje zadania efektywnie</p>
      </header>

      <main className="app-main">
        <TodoForm onAdd={handleAddTodo} />

        {todos.length > 0 && (
          <>
            <ProgressBar todos={todos} />
            <TodoFilters
              filter={filter}
              sortType={sortType}
              searchTerm={searchTerm}
              onFilterChange={setFilter}
              onSortChange={setSortType}
              onSearchChange={setSearchTerm}
              onClearCompleted={handleClearCompleted}
              stats={stats}
            />
          </>
        )}

        <TodoList
          todos={displayedTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </main>

      <footer className="app-footer">
        <p>Aplikacja do nauki testowania React</p>
      </footer>
    </div>
  );
};

export default App;
