import { getLoggedInUser } from './utils.js';

const createPostButton = document.querySelector('.create-post-button');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const createPostForm = document.querySelector('.create-post-form');
const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
const postLocationInput = document.getElementById('post-location');
const postSubmitButton = document.getElementById('submit-post-button');
const postsList = document.querySelector('.posts-list');
const seachFormInput = document.querySelector('.search-form-input');
const searchFormButton = document.querySelector('.search-form-button');

const retrievePosts = async () => {
    try {
        const response = await fetch('/post', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const posts = await response.json();
        posts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        renderPosts(posts);

    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const renderPosts = async (posts) => {
    if (posts.length === 0) {
        postsList.innerHTML = `<p class='not-found'>No posts found.</p>`;
        return;
    }

    const postsHTML = await Promise.all(posts.map(async (post) => {
        const response = await fetch(`/user/${post.authorId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const author = (await response.json());
        const { username } = author;

        return (
            `
            <li key=${post.id}>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
            <p class="post-location">Location of Incident: ${post.location}</p>
            <p class="post-username">Posted by: ${username}</p>
            <div class="post-buttons">
                <button class="upvote-button"><i class="ion-ios-arrow-up"></i></button>
                <span class="vote-count">12</span>
                <button class="downvote-button"><i class="ion-ios-arrow-down"></i></button>
            </div>
        </li>
            `
        );
    }));

    postsList.innerHTML = postsHTML.join('');
};

const createPost = async (e) => {
    e.preventDefault();

    const title = postTitleInput.value;
    const body = postBodyInput.value;
    const location = postLocationInput.value;

    const user = await getLoggedInUser();
    const { id } = user;

    if (!title || !body || !location) {
        alert('Please fill out all fields');
        return;
    }

    const response = await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: id, title, body, location }),
    });

    if (!response.ok) {
        alert('Error creating post');
        return;
    }

    console.log('Post created successfully');
    modal.style.display = 'none';
    createPostForm.reset();

    await retrievePosts();
}

const searchPosts = async (e) => {
    e.preventDefault();

    if (seachFormInput.value.trim() === '') {
        await retrievePosts();
        return;
    }

    const response = await fetch(`/post/location/${seachFormInput.value}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    const posts = await response.json();
    posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    renderPosts(posts);

    seachFormInput.value = '';
}

retrievePosts();

createPostButton.addEventListener("click", () => modal.style.display = 'block');
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

postSubmitButton.addEventListener('click', createPost);
searchFormButton.addEventListener('click', searchPosts);