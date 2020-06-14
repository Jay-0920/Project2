function searchPosts() {
  $("#search").click(function() {
    const userSearch = $("#user-input").val();
    console.log(userSearch);
    $.ajax({
      url: "http://localhost:3000/api/posts/" + userSearch,
      method: "GET"
    }).done();
  });
}

searchPosts();
