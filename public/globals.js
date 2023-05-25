      var map, places, infoWindow, directionsService, directionsRenderer;
      var markers = [];
      var autocomplete;
      var countryRestrict = {country: 'us'};
             // Create a new PlacesService object
    var placesService;
      
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    search(lat, lng); // Pass the latitude and longitude to the search function
  } else {
    document.getElementById('search').placeholder = 'Enter a location';
  }
}



function getDistance(lat1, lng1, lat2, lng2) {
  var rad = Math.PI / 180;
  var dLat = (lat2 - lat1) * rad;
  var dLng = (lng2 - lng1) * rad;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = 6371 * c; // Earth's radius in km
  return d;
}


      
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function searchPlace(query, callback) {
  var request = {
    query: query,
    type: 'establishment'
  };

  places.textSearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      callback(results[0]);
    } else {
      console.error('Error searching for place:', status);
    }
  });
}


function createMarker(place) {
  var marker = new google.maps.Marker({
    position: place.geometry.location,
    title: place.name,
    map: map,
    place_id: place.place_id
  });
  return marker;
}

function getPlaceDetails(place_id, callback) {
  var request = {
    placeId: place_id,
    fields: ['opening_hours']
  };

  places.getDetails(request, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      callback(place);
    } else {
      console.error('Error retrieving place details:', status);
    }
  });
}