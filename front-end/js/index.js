var thisIsAPlace = false;
const URL = "https://us-central1-hopeful-depot-255718.cloudfunctions.net/posts"

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 35.228, lng: -80.840 }
    });


    //AJAX INFO NEEDED HERE 
    //MAKE DYNAMIC
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<div id="bodyContent">' +
        '<p>City: Charlotte</p>' +
        '<p>Salary: $10,000 - $20,000</p>' +
        '<p>Happiness: 4</p>' +
        '<p>Comfort: 3</p>' +
        '<p>Created: 2019-06-12</p>' +
        '</div>' +
        '</div>';

    var clickHandler = new ClickEventHandler(map, origin);

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

    //Attach click event handler to the map.
    google.maps.event.addListener(map, 'click', function (e) {

        //Determine the location where the user has clicked.
        var location = e.latLng;

        if (!thisIsAPlace) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            var formString =
                '<div class="ml-3 mr-3" id="form-content">' +
                '<p><b>Salary</b></p>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="income" value="$0 - $30,000">' +
                '<label class="form-check-label" for="income">$0 - $30,000</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="income"  value="$30,001 - $50,000">' +
                '<label class="form-check-label" for="income">$30,001 - $50,000</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="income" value="$50,001 - $80,000" >' +
                '<label class="form-check-label" for="income">$50,001 - $80,000</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="income" value="$80,001 - $100,000" >' +
                '<label class="form-check-label" for="income">$80,001 - $100,000</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="income" value="$100,001+" >' +
                '<label class="form-check-label" for="income">$100,001+</label>' +
                '</div>' +
                '<p class="mt-3"><b>Happiness</b></p>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="happiness" value="1">' +
                '<label class="form-check-label" for="happiness">1</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="happiness"  value="2">' +
                '<label class="form-check-label" for="happiness">2</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="happiness" value="3" >' +
                '<label class="form-check-label" for="happiness">3</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="happiness" value="4" >' +
                '<label class="form-check-label" for="happiness">4</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="happiness" value="5" >' +
                '<label class="form-check-label" for="happiness">5</label>' +
                '</div>' +
                '<p class="mt-3"><b>Comfiness</b></p>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="comfy" value="1">' +
                '<label class="form-check-label" for="comfy">1</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="comfy" value="2">' +
                '<label class="form-check-label" for="comfy">2</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="comfy" value="3" >' +
                '<label class="form-check-label" for="comfy">3</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="comfy" value="4" >' +
                '<label class="form-check-label" for="comfy">4</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="comfy" value="5" >' +
                '<label class="form-check-label" for="comfy">5</label>' +
                '</div>' +
                '<br/>' +
                '<div class="text-center"><button onclick="submittedMarkerFxn()" type="submit" id="submitMarkerForm" class="btn btn-primary center-block mt-3 mb-2">Submit</button></div>' +
                '</div>'

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var markerFromForm = { latitude: e.latLng.lat(), longitude: e.latLng.lng(), city: "Charlotte", salary: "null", happiness: "5", comfort: "3", created: date };

            postData(markerFromForm);

            //e.latLng.lat() = latitude
            //e.latLng.lng() = longitude

            var infoWindow = new google.maps.InfoWindow({
                content: formString,
            });
            infoWindow.open(map, marker);

            // infoWindow.close
            // closeBtn.addEventListener('click', function (e) {
            //     console.log("closed");
            // });

            submittedMarkerFxn();

            // //Create a marker and placed it on the map.
            // var marker = new google.maps.Marker({
            //     position: location,
            //     map: map,
            //     animation: google.maps.Animation.DROP
            // });

            // //Attach click event handler to the marker.
            // google.maps.event.addListener(marker, "click", function (e) {
            //     var infoWindow = new google.maps.InfoWindow({
            //         content: formString,
            //     });
            //     infoWindow.open(map, marker);
            // });
        }
        thisIsAPlace = false;
    });

}

function submittedMarkerFxn() {
    var submittedMarker = document.getElementById('submitMarkerForm');

}


var ClickEventHandler = function (map, origin) {
    this.origin = origin;
    this.map = map;
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener('click', this.handleClick.bind(this));
};

ClickEventHandler.prototype.handleClick = function (event) {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {

        thisIsAPlace = true;

        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.
        event.stop();
        this.getPlaceInformation(event.placeId);
    }

    //If no event ID, then it calls event listener for marker addition
};

ClickEventHandler.prototype.getPlaceInformation = function (placeId) {
    var me = this;
    this.placesService.getDetails({ placeId: placeId }, function (place, status) {
        if (status === 'OK') {
            me.infowindow.close();
            me.infowindow.setPosition(place.geometry.location);
            me.infowindowContent.children['place-icon'].src = place.icon;
            me.infowindowContent.children['place-name'].textContent = place.name;
            me.infowindowContent.children['place-address'].textContent =
                place.formatted_address;
            me.infowindow.open(me.map);
        }
    });
};

function drop() {
    for (var i = 0; i < markerArray.length; i++) {
        setTimeout(function () {
            addMarkerMethod();
        }, i * 200);
    }
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

async function postData(data) {
    // Default options are marked with *
    const response = await fetch(URL, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            latitude: data.latitude,
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

//TODO: Validate responses
async function initMarkers(city, salary) {
    // TODO: MAKE FREAKING SURE TO SANITIZE ON BACKEND
    const response = await fetch(URL + "?city=" + city + "&salary=" + salary, {
        method: 'GET',
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

//TODO: Validate responses
async function updateMarkers(city = null, salary = null, happiness = null, comfort = null) {
    const response = await fetch(
        URL +
        "?city=" + city +
        "&salary=" + salary +
        "&happiness=" + happiness +
        "&comfort=" + comfort, {
            method: 'GET',
        }
    );
    return await response.json();
}