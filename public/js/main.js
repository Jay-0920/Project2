$(document).ready(function() {
  // blogContainer holds all of our posts
  const blogContainer = $(".blog-container");

  function getPosts() {
    $.get("/api/post", function(data) {
      console.log("Posts", data);
      initializeRows(data);
    });
  }

  getPosts();

  function initializeRows(posts) {
    blogContainer.empty();
    const postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    // card div
    const cardEl = $("<div>");
    cardEl.addClass("card");
    $(".blog-container").append(cardEl);
    // creating card header
    const cardHeader = $("<div>");
    cardHeader.addClass("card-header");
    cardEl.append(cardHeader);
    // creating card contents to append to card header
    const postTitle = $("<h3>");
    postTitle.addClass("post-title");
    postTitle.text(post.title);
    cardHeader.append(postTitle);
    const postAuthor = $("<h5>");
    postAuthor.addClass("post-author");
    postAuthor.text(post.author);
    cardHeader.append(postAuthor);
    // creating card body
    const cardBody = $("<div>");
    cardBody.addClass("card-body");
    cardEl.append(cardBody);
    // creating card contents to append to card body
    const postBody = $("<p>");
    postBody.addClass("post-body");
    postBody.text(post.body);
    cardBody.append(postBody);

    cardEl.data("post", post);
    return cardEl;
  }

  function searchZip() {
    $("#submitBtn").on("click", function(event) {
      const userSearch = $("#user-search").val();
      event.preventDefault();
      console.log(userSearch);
      $.get("/api/post/" + userSearch, function(data) {
        console.log("Posts", data);
        initializeRows(data);
      });
    });
  }

  searchZip();
});
