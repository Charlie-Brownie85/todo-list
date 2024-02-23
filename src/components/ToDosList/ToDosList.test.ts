import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';

import ToDosList from './ToDosList.vue';

import { useTodosStore } from '@/stores/todos';

import type { Todo } from '@/declarations/types';

const defaultTodos: Todo[] = [
  {
    id: '1',
    text: 'do laundry',
    completed: false,
  },
  {
    id: '2',
    text: 'buy groceries',
    completed: true,
  },
  {
    id: '3',
    text: 'clean the house',
    completed: false,
  },
];

const setup = (initialTodos = defaultTodos) => ({
  user: userEvent.setup(),
  ...render(ToDosList, {
    global: {
      stubs: {
        transition: true,
      },
      plugins: [createTestingPinia({
        initialState: {
          todos: {
            todos: initialTodos,
          },
        },
      })],
    },
  }),
});

describe('ToDosList', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the "ToDosList" component', () => {
    const { getByText } = setup();

    defaultTodos.forEach((todo) => {
      expect(getByText(todo.text)).toBeInTheDocument();
    });
  });

  it('should render first the uncompleted task and the completed ones after', () => {
    const { getAllByRole } = setup();

    const listItems = getAllByRole('listitem');
    const listItemsText = listItems.map((item) => item.textContent);

    expect(listItemsText).toEqual(['do laundry', 'clean the house', 'buy groceries']);
  });

  it('calls the "toggleToDo" method when a ToDo is checked', async () => {
    const { user, getAllByRole } = setup();

    const store = useTodosStore();

    await user.click(getAllByRole('checkbox')[1]);

    expect(store.toggleToDo).toHaveBeenCalledWith('1');
  });

  it('calls the "removeToDo" method when a ToDo is deleted', async () => {
    const { user, getAllByRole } = setup();

    const store = useTodosStore();

    await user.click(getAllByRole('button')[0]);

    expect(store.removeToDo).toHaveBeenCalledWith('1');
  });

  it('renders the proper text when all ToDos are completed', async () => {
    const { getByText } = setup();

    const store = useTodosStore();

    store.$patch({
      todos: defaultTodos.map((todo) => ({
        ...todo,
        completed: true,
      })),
    });

    await nextTick();

    expect(getByText('Great! No pending chores!')).toBeInTheDocument();
  });

  it('renders the proper text when there are no ToDos', async () => {
    const { getByText } = setup([]);

    expect(getByText('Start adding tasks!')).toBeInTheDocument();
  });

  it('calls "completeAllToDos" when the "Complete All" checkbox is checked', async () => {
    const { user, getByRole } = setup();

    const store = useTodosStore();

    await user.click(getByRole('checkbox', { name: 'complete all tasks' }));

    expect(store.completeAllToDos).toHaveBeenCalled();
  });

  it('calls "uncheckedToDos" when the "Uncheck All" button is clicked', async () => {
    const { user, getByRole } = setup([
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
      },
    ]);

    const store = useTodosStore();

    await user.click(getByRole('checkbox', { name: 'uncheck all tasks' }));

    expect(store.uncheckedToDos).toHaveBeenCalled();
  });

  it('calls "clearCompletedTodos" when the "Clear Completed" button is clicked', async () => {
    const { user, getByTestId } = setup([
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
    ]);

    const store = useTodosStore();

    await user.click(getByTestId('clear-all-todos'));

    expect(store.clearCompletedTodos).toHaveBeenCalled();
  });
});
