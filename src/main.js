import { createApp } from 'vue';
import { store } from '@/store';

import Game from './Game.vue';

const app = createApp(Game);

app.use(store);
app.mount('#app');
