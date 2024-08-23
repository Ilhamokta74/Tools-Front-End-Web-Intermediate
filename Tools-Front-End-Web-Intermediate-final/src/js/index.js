// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

import './layout/header';
import './layout/footer';

import Dashboard from './pages/listStory';
import CompanyProfile from './pages/companyProfile';
import Add from './story/addStory';

import Login from './pages/auth/login';
import Register from './pages/auth/register';

import './components/locale-picker';

// Define the routes
const routes = {
  '/': Dashboard,
  '/story/addStory.html': Add,
  '/company/companyProfile.html': CompanyProfile,
  '/auth/login.html': Login,
  '/auth/register.html': Register
};

// Function to detect the current route
const detectRoute = () => {
  const path = window.location.pathname;
  return routes[path] || null; // Return the route component or null if not found
};

// Initialize the route on DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
  const route = detectRoute();
  if (route) {
    await route.init();
  } else {
    console.error('Route not found for path:', window.location.pathname);
    // Optionally handle the case where the route is not found
  }
});
