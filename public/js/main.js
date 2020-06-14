$(document).ready(function() {
  function searchZip() {
    $("#submitBtn").on("click", function(event) {
      const userSearch = $("#user-search").val();
      event.preventDefault();
      console.log(userSearch);
      // $.ajax({
      //     url: "/api/post/" + userSearch,
      //     method: "GET"
      // }).done();
      $.get("/api/post/" + userSearch, function(data) {
        console.log("Posts", data);
      });
    });
  }

  searchZip();
});
