import { defineComponent } from 'vue';

import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import DarkMode from './DarkMode.vue';

// const mockedUseDark = vi.fn(() => ({ value: false }));
const mocks = vi.hoisted(() => ({
  mockedUseDark: vi.fn(() => ({ value: false })),
}));
const mockedUseToggle = vi.fn();

vi.mock('@vueuse/core', () => ({
  __esModule: true,
  useDark: mocks.mockedUseDark,
  useToggle: () => mockedUseToggle,
}));

const setup = () => ({
  user: userEvent.setup(),
  ...render(DarkMode, {
    global: {
      stubs: {
        transition: true,
        SVGIcon: defineComponent({
          name: 'SVGIcon',
          template: '<span>icon</span>',
        }),
      },
    },
  }),
});

describe('ToDosList', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the "DarkMode" component on dark mode', () => {
    const { getByText } = setup();

    expect(getByText('icon')).toHaveAttribute('name', 'dark-mode');
  });

  it('should render the "DarkMode" component on light mode', () => {
    mocks.mockedUseDark.mockReturnValueOnce({ value: true });

    const { getByText } = setup();

    expect(getByText('icon')).toHaveAttribute('name', 'light-mode');
  });

  it('should call the "useToggle" function when the button is clicked', async () => {
    const { user, getByRole } = setup();

    const button = getByRole('button');

    await user.click(button);

    expect(mockedUseToggle).toHaveBeenCalled();
  });
});
