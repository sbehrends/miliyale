function initMapRoute() {

  var daPlace = {
    lat: -34.3952257,
    lng: -58.6590911,
    title: 'Astilleros Millberg',
    icon: ''
  };

  var somePlace = {
    lat: -34.538145,
    lng: -58.500394,
    icon: '',
    visible: false
  };

  daPlace.LatLng = new google.maps.LatLng(daPlace.lat, daPlace.lng);
  somePlace.LatLng = new google.maps.LatLng(somePlace.lat, somePlace.lng);

  map = new google.maps.Map(document.getElementById('map'), {
    center: daPlace,
    zoom: 14,
    disableDefaultUI: true,
    scrollwheel: false,
    mapTypeControlOptions: {
      mapTypeIds: []
    }
  });

  // Add custom Stlye
  var mapStyle = new google.maps.StyledMapType([{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"-55"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#e9eff2"},{"visibility":"on"}]}], { name: 'daStyle' });
  map.mapTypes.set('daStyle', mapStyle);
  map.setMapTypeId('daStyle');

  // Directions Options
  var directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({
    suppressMarkers: true,
    preserveViewport: true,
    polylineOptions: {
      strokeWeight: 2,
      stokeOpacity: 1,
      strokeColor: '#C09900'
    }
  });

  // Add Circles UI to Marker
  new google.maps.Circle({
    strokeColor: 'transparent',
    strokeOpacity: 0,
    fillColor: '#C09900',
    fillOpacity: 1,
    center: daPlace.LatLng,
    radius: 40,
    map: map
  });
  new google.maps.Circle({
    strokeColor: 'transparent',
    strokeOpacity: 0,
    fillColor: '#C09900',
    fillOpacity: 0.3,
    center: daPlace.LatLng,
    radius: 100,
    map: map
  });
  new google.maps.Circle({
    strokeColor: 'transparent',
    strokeOpacity: 0,
    fillColor: '#C09900',
    fillOpacity: 0.1,
    center: daPlace.LatLng,
    radius: 200,
    map: map
  });

  // Calculate Route
  calculateAndDisplayRoute(directionsService, directionsDisplay, somePlace, daPlace);
};

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  var selectedMode = 'DRIVING';
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

var wow = new WOW();
wow.init();
