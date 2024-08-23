// Import custom CSS
import '../scss/main.scss';

// Import components
import './components/index';

// Import JavaScript files as needed
import Dashboard from './pages/dashboard';
import Add from './pages/stories/add';
import Profile from './pages/users/profile';

// For Detail Pages Pop-Up Modals
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/stories/add.html': Add,
  '/users/profile.html': Profile,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  if (route) {
    await route.init();
  }
});
