// app.js
function getLocations(restaurant) {
  var name    = restaurant[0];
  var address = restaurant[1];
  var geocoder = new google.maps.Geocoder();
  var promise = new Promise(function(resolve, reject) {
    geocoder.geocode({
      address: address,
      region: 'jp'
    },
    function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve([name, results[0].geometry.location]);
      } else {
        reject(status);
      }
    });
  });
  return promise;
}

function drawMap(markerData, map) {
  var name     = markerData[0];
  var location = markerData[1];
  var mapTag = document.getElementById('map');
  var position = new google.maps.LatLng(location.lat(), location.lng());
  var mapOptions = {
    zoom: 15,
    center: position,
    disableDefaultUI: true,
    mapTypeID: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(mapTag, mapOptions);

  console.log(name);
  new google.maps.Marker({
    position: position,
    map: map,
    title: name
  });
  return map;
}

function addMarker(markerDatas, map) {
  for (var i in markerDatas) {
    new google.maps.Marker({
      map: map,
      position: markerDatas[i][1],
      title: markerDatas[i][0]
    });
  }
}

// 初期表示
var map = null;
var firstPromise = getLocations(restaurants.shift());
firstPromise.then(function(markerData) {
  map = drawMap(markerData, map);
});

var promiseList = [];
for (var i in restaurants) {
  promiseList.push(getLocations(restaurants[i]));
}

Promise.all(promiseList)
  .then(function(markerDatas) {
    addMarker(markerDatas, map);
  });

