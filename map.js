// jordan's API key: AIzaSyDx5pRY8TyCf-gJGdBJ4paFUF1n6cDD_84"

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}