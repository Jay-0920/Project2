$(document).ready(function () {
  const postForm = $("#post");

  (postForm).on("submit", async function (event) {
    event.preventDefault();
    const { username } = await $.get("/api/user_data");
    const postTitle = $("#title");
    const postBody = $("#body");
    const location = $("#location");

    const newPost = {
      author: username,
      title: postTitle.val().trim(),
      body: postBody.val().trim(),
      location: location.val().trim()
    };

    $.ajax({
      method: "POST",
      url: "/api/post/",
      data: newPost
    }).then(function () {
      window.location.href = "/";
    });
  });
});