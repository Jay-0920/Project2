$(document).ready(function() {
  const postForm = $("#post");

  // submit form data
  function postData() {
    $(postForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();

      // Getting jQuery references to the post form, author, title, body, and location
      const postAuthor = $("#username")
        .val()
        .trim();
      const postTitle = $("#title")
        .val()
        .trim();
      const postBody = $("#body")
        .val()
        .trim();
      //let location = $("#location").val().trim();

      const newPost = {
        author: postAuthor,
        title: postTitle,
        body: postBody
      };
      console.log(newPost);
      routeUserLocation();
    });
  }

  // function routeUserLocation(Post) {

  //     let location = $("#location").val().trim();

  //     $.post("/api/post/" + location, Post, function() {
  //         window.location.href = "/main"
  //     })
  // }

  function routeUserLocation(post) {
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
