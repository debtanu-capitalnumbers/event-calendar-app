import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import route from './router';
import App from './App.vue';
import './assets/main.css';
import Notifications from '@kyvg/vue3-notification'
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
app.use(pinia);
app.use(route);
app.use(Notifications);
app.mount('#app');
