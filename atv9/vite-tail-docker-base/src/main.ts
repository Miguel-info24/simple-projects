import './css/style.css';

import { TaskPage } from './pages/TaskPage';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = '';
  app.appendChild(TaskPage());
}




