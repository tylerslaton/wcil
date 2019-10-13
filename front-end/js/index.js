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

async function postData(data) {
    const url = "https://us-central1-hopeful-depot-255718.cloudfunctions.net/posts";
    // Default options are marked with *
    const response = await fetch("https://us-central1-hopeful-depot-255718.cloudfunctions.net/posts", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            lattitude: data.lattitude,
            longitude: data.longitude,
            city: data.city,
            salary: data.salary,
            happiness: data.happiness,
            comfort: data.comfort,
        })
    });
    console.log(response)
    return await response.json(); // parses JSON response into native JavaScript objects
}