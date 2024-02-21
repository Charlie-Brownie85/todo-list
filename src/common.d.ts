/* eslint-disable camelcase */
declare module '@/*';
declare module 'uuid';

// declare module '*.svg' {
//   const content: any;
//   export default content;
// }
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
