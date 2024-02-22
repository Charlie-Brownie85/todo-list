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
    const { todos } = store;
    expect(todos.length).toBe(0);
    store.addToDo({
      id: '1',
      text: 'do laundry',
      completed: false,
    });
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('do laundry');
  });

  it('Removes a ToDo from the list', () => {
    const { todos } = store;
    store.addToDo({
      id: '1',
      text: 'do laundry',
      completed: false,
    });
    expect(todos.length).toBe(1);
    store.removeToDo('1');
    expect(todos.length).toBe(0);
  });

  it('Toggles a ToDo from the list', () => {
    const { todos } = store;
    store.addToDo({
      id: '1',
      text: 'do laundry',
      completed: false,
    });
    expect(todos[0].completed).toBe(false);
    store.toggleToDo('1');
    expect(todos[0].completed).toBe(true);
  });

  it('Completes all ToDos from the list', () => {
    const { todos } = store;
    store.addToDo({
      id: '1',
      text: 'do laundry',
      completed: false,
    });
    store.addToDo({
      id: '2',
      text: 'buy groceries',
      completed: false,
    });
    store.addToDo({
      id: '3',
      text: 'clean the house',
      completed: false,
    });
    store.completeAllToDos();
    expect(todos.every((todo) => todo.completed)).toBe(true);
  });
});
