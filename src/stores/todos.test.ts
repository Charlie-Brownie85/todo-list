// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia';

import { useTodosStore } from './todos';

describe('Todos Store', () => {
  let store: ReturnType<typeof useTodosStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTodosStore();
  });

  it('Adds a new ToDo to the list', () => {
    expect(store.todos.length).toBe(0);
    store.addToDo({
      id: '1',
      text: 'do laundry',
      completed: false,
    });
    expect(store.todos.length).toBe(1);
    expect(store.todos[0].text).toBe('do laundry');
  });

  it('Removes a ToDo from the list', () => {
    store.$patch({ todos: [{ id: '1', text: 'do laundry', completed: false }] });
    expect(store.todos.length).toBe(1);
    store.removeToDo('1');
    expect(store.todos.length).toBe(0);
  });

  it('Toggles a ToDo from the list', () => {
    store.$patch({ todos: [{ id: '1', text: 'do laundry', completed: false }] });
    expect(store.todos[0].completed).toBe(false);
    store.toggleToDo('1');
    expect(store.todos[0].completed).toBe(true);
  });

  it('Completes all ToDos from the list', () => {
    store.$patch({
      todos: [
        {
          id: '1',
          text: 'do laundry',
          completed: false,
        },
        {
          id: '2',
          text: 'buy groceries',
          completed: false,
        },
        {
          id: '3',
          text: 'clean the house',
          completed: false,
        },
      ],
    });
    store.completeAllToDos();
    expect(store.todos.every((todo) => todo.completed)).toBe(true);
  });

  it('Unchecks all ToDos from the list', () => {
    store.$patch({
      todos: [
        {
          id: '1',
          text: 'do laundry',
          completed: true,
        },
        {
          id: '2',
          text: 'buy groceries',
          completed: true,
        },
        {
          id: '3',
          text: 'clean the house',
          completed: true,
        }],
    });
    store.uncheckedToDos();
    expect(store.todos.every((todo) => !todo.completed)).toBe(true);
  });

  it('Clears all completed ToDos from the list', () => {
    store.$patch({
      todos: [
        {
          id: '1',
          text: 'do laundry',
          completed: true,
        },
        {
          id: '2',
          text: 'buy groceries',
          completed: false,
        },
        {
          id: '3',
          text: 'clean the house',
          completed: true,
        },
      ],
    });
    expect(store.todos.length).toBe(3);
    store.clearCompletedTodos();
    expect(store.todos.length).toBe(1);
  });
});
