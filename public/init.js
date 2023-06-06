   function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 43.290367, lng: -79.8255196},
          zoom: 11.27
        });
        infoWindow = new google.maps.InfoWindow();
        places = new google.maps.places.PlacesService(map);

         // Initialize directionsService and directionsRenderer
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        
        // Create a new PlacesService object
        placesService = new google.maps.places.PlacesService(map);

        autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('search'), {
            types: ['geocode'],
            componentRestrictions: countryRestrict
          });
          
        autocomplete.addListener('place_changed', onPlaceChanged);

        // Populates markers based on list of Fasc locations in places.js
        fascLocations.forEach((fasc) => {
          searchPlace(fasc, function(place) {
            let marker = createMarker(place);
            markers.push(marker);
          })
        })
      }