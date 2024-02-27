import { createApp } from 'vue';

import App from './App.vue';

import i18n from '@/i18n';

import store from '@/stores';
import SVGIcon from '@/components/SVGIcon/SVGIcon.vue';

import '@/css/main.css';

const app = createApp(App)
  .use(i18n)
  .use(store)
  .component('SVGIcon', SVGIcon);

app.mount('#app');
