$(document).ready(function () {
  // blogContainer holds all of our posts
  const blogContainer = $(".blog-container");

  function getPosts() {
    $.get("/api/post", function (data) {
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
    // UpVote + DownVote
    const upVote = $("<i>");
    upVote.addClass("fas fa-thumbs-up");
    const upVoteButton = $("<button>");
    upVoteButton.addClass("upvote");
    upVoteButton.attr("data-id", post.id);
    upVoteButton.append(upVote);
    cardHeader.append(upVoteButton);
    const downVote = $("<i>");
    downVote.addClass("fas fa-thumbs-down");
    const downVoteButton = $("<button>");
    downVoteButton.addClass("downvote");
    downVoteButton.attr("data-id", post.id);
    downVoteButton.append(downVote);
    const data = await $.get(`/api/votes/${post.id}`);
    const voteCount = data.length;
    const voteCountSpan = $("<span>");
    voteCountSpan.text(`Truth Score: ${voteCount}`);
    cardHeader.append(voteCountSpan);
    cardHeader.append(downVoteButton);
    // End of Votes
    const postTitle = $("<h3>");
    postTitle.addClass("post-title");
    postTitle.text(post.title);
    cardHeader.append(postTitle);
    const user = $("<h5>");
    user.addClass("post-username");
    user.text(`created by: ${post.author ? post.author : "anonymous"}`);
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
    $("#submitBtn").on("click", function (event) {
      const userSearch = $("#user-search").val();
      event.preventDefault();
      console.log(userSearch);
      $.get("/api/post/" + userSearch, function (data) {
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
  console.log(this);
  $.post(`api/post/vote/${$(this).data("id")}`, { vote: true });
  window.location.reload();
}

function decValidity() {
  console.log(this.parentElement);
  $.post(`api/post/vote/${$(this).data("id")}`, { vote: false });
  window.location.reload();
}
