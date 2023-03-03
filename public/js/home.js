import { getLoggedInUser } from './utils.js';

const user = await getLoggedInUser();
const logoutButton = document.querySelector('.logout-button');

const displayWelcomeMessage = () => {
  const welcomeMessage = document.querySelector('.welcome-message');
  user ? welcomeMessage.textContent = `Welcome, ${user.username}!` : welcomeMessage.textContent = 'Welcome!';
}

const logoutUser = async () => {
  const response = await fetch('/auth/logout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    console.log('Failed to logout');
    return;
  }
  window.location.href = '/login';
}

displayWelcomeMessage();
logoutButton.addEventListener('click', logoutUser);