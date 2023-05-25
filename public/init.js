   function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.3995, lng: -84.561335},
          zoom: 15
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
        
        searchPlace(`
          True West Coffee,
          313 Main St,
          Hamilton, OH, 45013
          `, function(place) {
          var marker = createMarker(place);
          markers.push(marker);
        });

        // Search for Waffle House
        searchPlace(`
          Waffle House,
          829 High St,
          Hamilton, OH, 45011
          `, function(place) {
          var marker = createMarker(place);
          markers.push(marker);
        });

      }