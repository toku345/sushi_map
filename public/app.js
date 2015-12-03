// app.js
function getLocations(address) {
  var geocoder = new google.maps.Geocoder();
  var promise = new Promise(function(resolve, reject) {
    geocoder.geocode({
      address: addressList[i],
      region: 'jp'
    },
    function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject(status);
      }
    });
  });
  return promise;
}

function drawMap(locations) {
  console.log(locations);
  google.maps.event.addDomListener(window, 'load', function() {
    var mapTag = document.getElementById('map');
    var centerPosition = new google.maps.LatLng(locations[0].lat(), locations[0].lng());
    var mapOptions = {
      zoom: 15,
      center: centerPosition,
      disableDefaultUI: true,
      mapTypeID: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(mapTag, mapOptions);

    var markers = [];
    for (var i in locations) {
      var position = new google.maps.LatLng(locations[i].lat(), locations[i].lng());
      markers.push(new google.maps.Marker({
        position: position,
        map: map
      }));
    }
  });
}

var promiseList = [];

for (var i in addressList) {
  promiseList.push(getLocations(addressList[i]));
}

Promise.all(promiseList)
  .then(function(locations) {
    drawMap(locations);
  });

