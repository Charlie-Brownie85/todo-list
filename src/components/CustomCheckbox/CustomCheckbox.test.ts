import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import CustomCheckbox from './CustomCheckbox.vue';

interface Props {
  value?: string | boolean;
  modelValue?: boolean;
  inputId: string;
  disabled?: boolean;
  checkColor?: string;
}

const setup = (
  props: Props = { inputId: 'test-checkbox' },
  attrs = {},
) => ({
  user: userEvent.setup(),
  ...render(CustomCheckbox, {
    props,
    attrs,
  }),
});

describe('CustomCheckbox', () => {
  const getInput = () => screen.getByRole('checkbox');

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the "CustomCheckbox" component', () => {
    setup();

    expect(getInput()).toBeInTheDocument();
  });

  it('should have the correct id', () => {
    const inputId = 'test-id';
    setup({ inputId });

    expect(getInput().id).toBe(inputId);
  });

  it('shouldn\'t be checked by default', () => {
    setup();

    expect(getInput()).not.toBeChecked();
  });

  it('should be checked when the "checked" attributed is true', () => {
    setup(undefined, { checked: true });

    expect(getInput()).toBeChecked();
  });

  it('should emit an event when the input is clicked (checked)', async () => {
    const { emitted, user } = setup();

    await user.click(getInput());
    expect(emitted('update:modelValue')).toEqual([[true]]);
  });

  it('should emit an event when the input is clicked (unchecked)', async () => {
    const { emitted, user } = setup(undefined, { checked: true });

    await user.click(getInput());
    expect(emitted('update:modelValue')).toEqual([[false]]);
  });

  it('should become checked when unchecked and clicked', async () => {
    const { user } = setup();

    expect(getInput()).not.toBeChecked();
    await user.click(getInput());
    expect(getInput()).toBeChecked();
  });

  it('should become unchecked when checked and clicked', async () => {
    const { user } = setup(undefined, { checked: true });

    expect(getInput()).toBeChecked();
    await user.click(getInput());
    expect(getInput()).not.toBeChecked();
  });
});
