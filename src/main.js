// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css'
import NotificationService from './notificationService';


const app = createApp(App);

app.config.globalProperties.$notify = NotificationService;

app
    .use(router)
    .use(store)
    .mount('#app');
