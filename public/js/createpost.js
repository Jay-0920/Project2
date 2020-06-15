$(document).ready(function() {
  const postForm = $("#post");

  // submit form data
  function postData() {
    $(postForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();

      // Getting jQuery references to the post form, author, title, and body
      const postAuthor = $("#username");
      const postTitle = $("#title");
      const postBody = $("#body");

      const newPost = {
        author: postAuthor.val().trim(),
        title: postTitle.val().trim(),
        body: postBody.val().trim()
      };
      console.log(newPost);
      submitPost();
    });
  }

  function submitPost(post) {
    const location = $("#location")
      .val()
      .trim();
    console.log(location);

    $.ajax({
      method: "POST",
      url: "/api/post/" + location,
      data: post
    }).then(function() {
      window.location.href = "/main";
    });
  }

  // Call postData function
  postData();
});
