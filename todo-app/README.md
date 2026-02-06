# 📝 Todo App - Aplikacja do nauki testowania

Prosta aplikacja React do zarządzania zadaniami, stworzona jako środowisko do nauki pisania testów jednostkowych i integracyjnych.

## 🚀 Uruchomienie aplikacji

```bash
# Instalacja zależności
npm install

# Uruchomienie aplikacji
npm start

# Uruchomienie testów
npm test

# Uruchomienie testów z pokryciem kodu
npm test -- --coverage
```

## 📁 Struktura projektu

```
src/
├── components/           # Komponenty React
│   ├── TodoItem.tsx     # Pojedynczy element listy
│   ├── TodoList.tsx     # Lista zadań
│   ├── TodoForm.tsx     # Formularz dodawania
│   ├── TodoFilters.tsx  # Filtry i sortowanie
│   └── ProgressBar.tsx  # Pasek postępu
├── utils/
│   └── todoUtils.ts     # Funkcje pomocnicze (do testów jednostkowych)
├── types/
│   └── Todo.ts          # Typy TypeScript
├── __tests__/           # Testy
│   ├── utils/           # Testy jednostkowe funkcji
│   ├── components/      # Testy komponentów
│   └── integration/     # Testy integracyjne
└── App.tsx              # Główny komponent
```

## 🧪 Testowanie

### Narzędzia testowe

- **Jest** - framework do testowania
- **React Testing Library** - biblioteka do testowania komponentów React
- **@testing-library/user-event** - symulacja interakcji użytkownika

### Uruchamianie testów

```bash
# Wszystkie testy
npm test

# Testy z podglądem pokrycia
npm test -- --coverage

# Konkretny plik testowy
npm test -- todoUtils.test.ts

# Testy w trybie watch
npm test -- --watch
```

### Typy testów

#### 1. Testy jednostkowe (Unit Tests)
Testują pojedyncze funkcje w izolacji.

**Lokalizacja:** `src/__tests__/utils/`

**Przykład:**
```typescript
describe('validateTodoText', () => {
  it('should return valid for correct text', () => {
    const result = validateTodoText('Valid todo text');
    expect(result.isValid).toBe(true);
  });
});
```

#### 2. Testy komponentów (Component Tests)
Testują pojedyncze komponenty React.

**Lokalizacja:** `src/__tests__/components/`

**Przykład:**
```typescript
it('should render todo text', () => {
  render(<TodoItem todo={mockTodo} {...mockHandlers} />);
  expect(screen.getByTestId('todo-text')).toHaveTextContent('Test');
});
```

#### 3. Testy integracyjne (Integration Tests)
Testują współpracę wielu komponentów.

**Lokalizacja:** `src/__tests__/integration/`

**Przykład:**
```typescript
it('should add and display a new todo', async () => {
  render(<App />);
  await user.type(screen.getByTestId('todo-input'), 'New task');
  await user.click(screen.getByTestId('add-btn'));
  expect(screen.getByText('New task')).toBeInTheDocument();
});
```

## 📝 Ćwiczenia dla kursantów

### Poziom 1: Testy jednostkowe (utils)

1. **Dokończ testy dla `sortTodos`**
   - Test sortowania po dacie
   - Test sortowania po priorytecie
   - Test sortowania alfabetycznego

2. **Dokończ testy dla `clearCompleted`**
   - Test usuwania ukończonych zadań
   - Test zachowania aktywnych zadań

3. **Napisz testy dla `toggleAllTodos`**
   - Test oznaczania wszystkich jako ukończone
   - Test oznaczania wszystkich jako aktywne

4. **Napisz testy dla `isOverdue`**
   - Test dla zadania przeterminowanego
   - Test dla zadania ukończonego (nie powinno być przeterminowane)
   - Test z różnymi progami dni

### Poziom 2: Testy komponentów

1. **Dokończ testy dla `TodoItem`**
   - Test anulowania edycji klawiszem Escape
   - Test anulowania edycji przyciskiem
   - Test klasy CSS dla ukończonych zadań

2. **Napisz testy dla `TodoFilters`**
   - Test renderowania wszystkich przycisków filtrów
   - Test zmiany filtra
   - Test pola wyszukiwania
   - Test przycisku "Wyczyść ukończone"

3. **Napisz testy dla `ProgressBar`**
   - Test wyświetlania poprawnego procentu
   - Test dla pustej listy
   - Test aktualizacji przy zmianach

### Poziom 3: Testy integracyjne

1. **Dokończ testy integracyjne w `App.integration.test.tsx`**
   - Test aktualizacji paska postępu
   - Test czyszczenia ukończonych zadań
   - Test sortowania
   - Test edycji zadania

2. **Napisz nowe scenariusze**
   - Test pełnego przepływu: dodaj → edytuj → ukończ → usuń
   - Test filtrowania i wyszukiwania jednocześnie
   - Test dodawania wielu zadań z różnymi priorytetami

## 🎯 Dobre praktyki testowania

### AAA Pattern (Arrange-Act-Assert)
```typescript
it('should toggle todo', () => {
  // Arrange - przygotowanie
  const todo = createMockTodo({ completed: false });
  
  // Act - akcja
  const result = toggleTodo(todo);
  
  // Assert - asercja
  expect(result.completed).toBe(true);
});
```

### Używaj data-testid
```tsx
<button data-testid="delete-btn">Usuń</button>
```

### Testuj zachowanie, nie implementację
```typescript
// ❌ Źle - testuje implementację
expect(component.state.isOpen).toBe(true);

// ✅ Dobrze - testuje zachowanie
expect(screen.getByTestId('modal')).toBeVisible();
```

### Używaj userEvent zamiast fireEvent dla interakcji
```typescript
// ❌ fireEvent - syntetyczne eventy
fireEvent.click(button);

// ✅ userEvent - symuluje prawdziwe interakcje
await user.click(button);
```

## 📚 Przydatne linki

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Common mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🏆 Kryteria zaliczenia

- [ ] Wszystkie istniejące testy przechodzą
- [ ] Uzupełnione testy oznaczone jako `it.todo()`
- [ ] Pokrycie kodu > 80%
- [ ] Testy są czytelne i dobrze zorganizowane
