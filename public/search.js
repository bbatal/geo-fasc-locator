function search(lat, lng) {
  var closestMarker = null;
  var closestDistance = Number.MAX_VALUE;

  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    var markerLat = marker.getPosition().lat();
    var markerLng = marker.getPosition().lng();
    var distance = getDistance(lat, lng, markerLat, markerLng);

    if (distance < closestDistance) {
      closestMarker = marker;
      closestDistance = distance;
    }
  }

   if (closestMarker) {
    var origin = new google.maps.LatLng(lat, lng);
    var destination = closestMarker.getPosition();

    // Request directions using the Directions API
    var request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    };

     getPlaceDetails(closestMarker.place_id, function(place) {
      var openingHours = place.opening_hours.weekday_text;
      var hoursInfo = document.getElementById('hours');
      hoursInfo.innerHTML = 'Store hours:<br>' + openingHours.join('<br>');
    });

    directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);

        // / Calculate the distance in kilometers
        var distanceInKm = getDistance(lat, lng, destination.lat(), destination.lng()).toFixed(2);

        // Display the distance and closest location in the info div
        var info = document.getElementById('info');
        info.innerHTML = 'Closest location: ' + closestMarker.getTitle() + '<br>Distance: ' + distanceInKm + ' km';
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

