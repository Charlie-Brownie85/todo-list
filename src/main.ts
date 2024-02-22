import { createApp } from 'vue';

import App from './App.vue';

import store from '@/stores';
import SVGIcon from '@/components/SVGIcon/SVGIcon.vue';

import '@/css/main.css';

const app = createApp(App).use(store).component('SVGIcon', SVGIcon);

app.mount('#app');
