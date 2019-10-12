function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 35.228, lng: -80.840 }
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        { imagePath: 'img/m' });

    map.setMapTypeId('terrain');

    map.addListener('center_changed', function () {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 3000);
    });
}
var locations = [
    { lat: 35.228, lng: -80.340 },
    { lat: 35.008, lng: -80.740 },
    { lat: 35.328, lng: -80.140 },
    { lat: 35.528, lng: -80.930 },
    { lat: 35.828, lng: -80.420 },
    { lat: 35.728, lng: -80.590 },
    { lat: 35.828, lng: -80.210 },
    { lat: 35.428, lng: -80.350 },
    { lat: 35.328, lng: -80.790 },
    { lat: 35.128, lng: -80.120 },
    { lat: 35.028, lng: -80.790 },
    { lat: 35.258, lng: -80.080 },
    { lat: 35.348, lng: -80.160 },
    { lat: 35.628, lng: -80.820 },
]

