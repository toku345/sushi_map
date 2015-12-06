// app.js
function getLocation(restaurant) {
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
  var location = markerData[1];
  var mapTag = document.getElementById('map');
  var position = new google.maps.LatLng(location.lat(), location.lng());
  var mapOptions = {
    zoom: 16,
    center: position,
    disableDefaultUI: true,
    mapTypeID: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(mapTag, mapOptions);
  addMarker(markerData, map);

  return map;
}

function generatgeContentStr(markerData) {
  var contentStr = "";
  contentStr += "<bold>" + markerData[0] + "</bold>";
  return contentStr;
}

function addMarker(markerData, map) {
  var contentStr = generatgeContentStr(markerData);
  var infowindow = new google.maps.InfoWindow({
    content: contentStr
  });

  var marker = new google.maps.Marker({
    map: map,
    position: markerData[1],
    title: markerData[0]
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

// function addCurrentPosMarker(navigationPosition) {
//   var marker = new google.maps.Marker({
//     map: map,
//     position: markerData[1],
//     title: markerData[0]
//   });
// }

function addMarkers(markerDatas, map) {
  console.log(markerDatas);
  for (var i in markerDatas) {
    addMarker(markerDatas[i], map);
  }
}

// 初期表示
var map = null;
var firstPromise = getLocation(restaurants.shift());
firstPromise.then(function(markerData) {
  map = drawMap(markerData, map);

  // 現在地 (現在地が表示できるときのみ表示する)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      // ON SUCCESS
      var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      addMarker(['現在地', position], map);
    }, function (error) {
      // ON ERROR
      console.log('以下のエラーにより現在地の取得に失敗しました。: ' + error);
    });
  } else {
      console.log('位置情報が許可されていません。。。');
  }
});

var promiseList = [];
for (var i in restaurants) {
  promiseList.push(getLocation(restaurants[i]));
}

Promise.all(promiseList)
  .then(function(markerDatas) {
    addMarkers(markerDatas, map);
  });

