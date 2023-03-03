const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        console.log('Please enter a email and password');
        return;
    }

    const loginParams = { email, password };

    const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginParams),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send cookies
    });

    if (!response.ok) {
        console.log('Failed to login');
        return;
    }

    // TODO: Navigate to home from the route
    document.location.replace('/');

}

loginForm.addEventListener('submit', handleLogin);