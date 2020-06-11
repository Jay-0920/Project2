// // Jordan API KEY: AIzaSyDx5pRY8TyCf-gJGdBJ4paFUF1n6cDD_84

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize() {
  var  minneapolis = { lat: 44.9778, lng: -93.2650 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: minneapolis
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(minneapolis, map);
}

// Adds a marker to the map.
function addMarker(location, map) {

  // custom marker image
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };



  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    icon: image
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
