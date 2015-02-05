function initMap(canvas) {
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(53.47, -2.23)
    }
    var map = new google.maps.Map(document.getElementById(canvas), mapOptions);
    return map;
}

function heatMap(data, map){
    var results = data.results.bindings;
    var items = [];
    for (i = 0; i < results.length; i++) {

        var easting = parseFloat(results[i].easting.value);
        var northing = parseFloat(results[i].northing.value);

        var osr = new OSRef(easting, northing);

        var ll = osr.toLatLng();

        var gll = new google.maps.LatLng(ll.lat, ll.lng);

        items.push(gll);
    }

    var pointArray = new google.maps.MVCArray(items);

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: 20
    });

    heatmap.setMap(map);
}

function visOnMap(data, map) {
    var results = data.results.bindings;
    var items = [];
    for (i = 0; i < results.length; i++) {
        var loc = [results[i].type.value, parseFloat(results[i].long.value), parseFloat(results[i].lat.value), i];

        items.push(loc);
    }
    setMarkers(map, items);
}

function setMarkers(map, locations) {
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < locations.length; i++) {
        var item = locations[i];
        var myLatLng = new google.maps.LatLng(item[1], item[2]);
        var image = {
            url: "images/" + item[0] + ".png",
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 32)
        };
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image,
            shape: shape,
            title: item[0],
            zIndex: item[3]
        });
    }
}