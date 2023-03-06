const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const submitButton = document.getElementById('submit-button');

const registerUser = async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (!username || !email || !password || !passwordConfirm) {
        alert('Please fill out all fields.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            alert('Error creating user');
            return;
        }

        window.location.href = '/login';
    } catch (err) {
        console.log(err);
    }
}

submitButton.addEventListener('click', registerUser);