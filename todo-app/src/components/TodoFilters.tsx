import React from 'react';
import { FilterType, SortType } from '../types/Todo';
import './TodoFilters.css';

interface TodoFiltersProps {
  filter: FilterType;
  sortType: SortType;
  searchTerm: string;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onSearchChange: (search: string) => void;
  onClearCompleted: () => void;
  stats: { total: number; active: number; completed: number };
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  sortType,
  searchTerm,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onClearCompleted,
  stats,
}) => {
  return (
    <div className="todo-filters" data-testid="todo-filters">
      <div className="filters-row">
        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Szukaj zadań..."
            data-testid="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => onFilterChange('all')}
            data-testid="filter-all"
          >
            Wszystkie ({stats.total})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => onFilterChange('active')}
            data-testid="filter-active"
          >
            Aktywne ({stats.active})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => onFilterChange('completed')}
            data-testid="filter-completed"
          >
            Ukończone ({stats.completed})
          </button>
        </div>

        <div className="sort-box">
          <select
            value={sortType}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            data-testid="sort-select"
          >
            <option value="date">Sortuj: Data</option>
            <option value="priority">Sortuj: Priorytet</option>
            <option value="alphabetical">Sortuj: Alfabetycznie</option>
          </select>
        </div>

        {stats.completed > 0 && (
          <button
            className="clear-completed"
            onClick={onClearCompleted}
            data-testid="clear-completed-btn"
          >
            Wyczyść ukończone
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;
