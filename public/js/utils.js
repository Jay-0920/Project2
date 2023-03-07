export const getLoggedInUser = async () => {
    const response = await fetch('/auth/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    const data = await response.json();
    const { user } = data;
    return user;
}