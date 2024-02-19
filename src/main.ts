import { createApp } from 'vue';

import App from './App.vue';

import store from '@/stores';

import '@/css/main.css';

const app = createApp(App).use(store);

app.mount('#app');
