import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import ToDoItem from './ToDoItem.vue';

import type { Todo } from '@/declarations/types';

interface Props {
  todo: Todo;
}

const setup = (
  props: Props = {
    todo: {
      id: 'test-id',
      text: 'do laundry',
      completed: false,
    },
  },
) => ({
  user: userEvent.setup(),
  ...render(ToDoItem, {
    props,
  }),
});

describe('ToDoItem', () => {
  const getInput = () => screen.getByRole('checkbox');

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the "ToDoItem" component', () => {
    const { getByText, getByTestId } = setup();

    expect(getInput()).toBeInTheDocument();
    expect(getByText('do laundry')).toBeInTheDocument();
    expect(getByTestId('delete-todo')).toBeInTheDocument();
  });

  it('should emit an event when the input is clicked', async () => {
    const { emitted, user } = setup();

    await user.click(getInput());

    expect(emitted()).toHaveProperty('toggle-todo');
  });

  it('should render the "ToDoItem" component checked if it\'s already completed', () => {
    const completedTodo = {
      id: 'test-id',
      text: 'do laundry',
      completed: true,
    };

    setup({ todo: completedTodo });

    expect(getInput()).toBeChecked();
  });

  it.skip('should emit an event when the delete button is clicked', async () => {
    const { emitted, user } = setup();

    await user.click(screen.getByTestId('delete-todo'));

    expect(emitted()).toHaveProperty('remove-todo');
  });
});
