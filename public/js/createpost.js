$(document).ready(function() {
  const postForm = $("#post");

  // submit form data

  $(postForm).on("submit", function(event) {
    event.preventDefault();

    // Getting jQuery references to the post form, author, title, and body
    const postAuthor = $("#username");
    const postTitle = $("#title");
    const postBody = $("#body");
    const location = $("#location");

    const newPost = {
      author: postAuthor.val().trim() || "anonymous",
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
