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
    posts.sort((a, b) => a.createdAt - b.createdAt);
    blogContainer.empty();
    const postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    console.log(postsToAdd);
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  async function createNewRow(post) {
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
    const user = $("<h5>");
    user.addClass("post-username");
    user.text("created by: " + post.author);
    cardHeader.append(user);
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

  // Click Events for Validation
  $(document).on("click", ".upvote", incValidity);
  $(document).on("click", ".downvote", decValidity);

  // Validation Functions
  function incValidity() {
    // let validity = 0; // grab current post validity // sequelize validity defaults to 0
    // validity++
    // postReq
    // jQuery.post(`api/post/vote/${this.data("id")}`, {vote: true});
  }

  function decValidity() {
    // let validity = 0; // grab current validity // sequelize validity defaults to 0
    // validity--
  }
