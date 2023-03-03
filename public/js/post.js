import { getLoggedInUser } from './utils.js';

const createPostButton = document.querySelector('.create-post-button');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const createPostForm = document.querySelector('.create-post-form');
const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
const postLocationInput = document.getElementById('post-location');
const postSubmitButton = document.getElementById('submit-post-button');

const createPost = async (e) => {
    e.preventDefault();

    const title = postTitleInput.value;
    const body = postBodyInput.value;
    const location = postLocationInput.value;

    const user = await getLoggedInUser();
    const { id } = user;

    if (!title || !body || !location) {
        console.log('Please fill out all fields');
        return;
    }

    const response = await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: id, title, body, location }),
    });

    if (!response.ok) {
        console.log('Error creating post');
        return;
    }
    
    console.log('Post created successfully');
    modal.style.display = 'none';
    createPostForm.reset();
}


createPostButton.addEventListener("click", () => modal.style.display = 'block');

closeModal.addEventListener('click', () => modal.style.display = 'none');

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

postSubmitButton.addEventListener('click', createPost);