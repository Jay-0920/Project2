$(document).ready(function() {
  const postForm = $("#post");

  // submit form data
  $(postForm).on("submit", async function(event) {
    event.preventDefault();
    const { username } = await $.get("/api/user_data");
    console.log(username);
    // Getting jQuery references to the post form, author, title, and body
    const postTitle = $("#title");
    const postBody = $("#body");
    const location = $("#location");

    const newPost = {
      author: username || "anonymous",
      title: postTitle.val().trim(),
      body: postBody.val().trim(),
      location: location.val().trim()
    };
    console.log(newPost);
    $.ajax({
      method: "POST",
      url: "/api/post/",
      data: newPost
    }).then(function() {
      window.location.href = "/main";
    });
  });
});
