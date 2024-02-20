/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { config } from '@vue/test-utils';
// import { createI18n } from 'vue-i18n';
import { createTestingPinia } from '@pinia/testing';

expect.extend(matchers);

// const i18n = createI18n({
//   legacy: false,
//   globalInjection: true,
//   fallbackWarn: false,
//   missingWarn: false,
// });

//* * If  i18n is used add it as a plugin */
// @ts-ignore
config.global = {
  plugins: [createTestingPinia()],
  mocks: {
    $t: (msg: string) => msg,
  },
  stubs: {
    'router-view': true,
  },
};
