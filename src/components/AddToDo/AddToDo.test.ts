import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import AddToDo from './AddToDo.vue';

import { useTodosStore } from '@/stores/todos';

const mocks = vi.hoisted(() => ({
  placeholderExamples: [
    'placeholder example 1',
    'placeholder example 2',
    'placeholder example 3',
    'placeholder example 4',
  ],
}));

vi.mock('@/utils/placeholder-examples', () => ({
  placeholderExamples: mocks.placeholderExamples,
}));

vi.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));

const setup = () => ({
  user: userEvent.setup(),
  ...render(AddToDo),
});

describe('AddToDo', () => {
  const getInput = () => screen.getByRole('textbox');
  const getButton = () => screen.getByRole('button');

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the "AddToDo" component', () => {
    setup();

    expect(getInput()).toBeInTheDocument();
    expect(getButton()).toBeInTheDocument();
  });

  it('should render a placeholder from the list', () => {
    setup();

    const placeholderValue = (getInput() as HTMLInputElement).placeholder.replace('e.g. ', '');

    expect(mocks.placeholderExamples).toContain(placeholderValue);
  });

  it('button should be disabled when input is empty', () => {
    setup();

    expect(getButton()).toBeDisabled();
  });

  it('button should be enabled when input is not empty', async () => {
    const { user } = setup();

    await user.type(getInput(), 'test');

    expect(getButton()).not.toBeDisabled();
  });

  it('should add a todo when button ins clicked', async () => {
    const { user } = setup();

    const store = useTodosStore();

    await user.type(getInput(), 'test');
    await user.click(getButton());

    expect(store.addToDo).toHaveBeenCalledWith(
      {
        id: 'mock-uuid',
        text: 'test',
        completed: false,
      },
    );
  });

  it('should add a todo when "enter" key is pressed', async () => {
    const { user } = setup();

    const store = useTodosStore();

    await user.type(getInput(), 'test');
    await user.keyboard('{enter}');

    expect(store.addToDo).toHaveBeenCalledWith(
      {
        id: 'mock-uuid',
        text: 'test',
        completed: false,
      },
    );
  });

  it('should clear the input after adding a todo', async () => {
    const { user } = setup();

    await user.type(getInput(), 'test');
    await user.click(getButton());

    expect(getInput()).toHaveValue('');
  });

  it('should not add a todo when input is empty', async () => {
    const { user } = setup();

    const store = useTodosStore();

    getInput().focus();
    await user.keyboard('{enter}');

    expect(store.addToDo).not.toHaveBeenCalled();
  });

  it('should pick up a new placeholder when adding a todo', async () => {
    const { user } = setup();

    const placeholderValues = [
      (getInput() as HTMLInputElement).placeholder.replace('e.g. ', ''),
    ];

    for (let i = 0; i < 3; i += 1) {
      /* eslint-disable no-await-in-loop */
      await user.type(getInput(), 'test');
      await user.click(getButton());
      /* eslint-enable no-await-in-loop */
      placeholderValues.push((getInput() as HTMLInputElement).placeholder.replace('e.g. ', ''));
    }

    expect(new Set(placeholderValues).size).toBeGreaterThan(1);
  });
});
