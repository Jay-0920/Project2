const logoutButton = document.querySelector('.logout-button');

const getLoggedInUser = async () => {
    const response = await fetch('/auth/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send cookies
    });

    const data = await response.json();
    const { user } = data;

    displayWelcomeMessage(user);
}

const displayWelcomeMessage = (user) => {
    const welcomeMessage = document.querySelector('.welcome-message');
    welcomeMessage.textContent = `Welcome, ${user.username}!`;
}

const logoutUser = async () => {
    const response = await fetch('/auth/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send cookies
    });

    const data = await response.json();
    const { message } = data;

    if (message === 'logout successful') {
        window.location.href = '/';
    }
}

logoutButton.addEventListener('click', logoutUser);

getLoggedInUser();