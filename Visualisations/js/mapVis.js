function initMap(canvas) {
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(53.47, -2.23)
    }
    var map = new google.maps.Map(document.getElementById(canvas), mapOptions);
    return map;
}

function heatVis(data, map){
    var results = data.results.bindings;
    var items = [];
    for (i = 0; i < results.length; i++) {
		var gll = getLatLng(results[i]);
        items.push(gll);
    }
	console.log("data contains " + items.length + " items");
    var pointArray = new google.maps.MVCArray(items);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: 20
    });
    heatmap.setMap(map);
}

function getLatLng(location){
	var latLng;
	if(location.hasOwnProperty("lat") && location.hasOwnProperty("long")){
		latLng = new google.maps.LatLng(parseFloat(location.lat.value), parseFloat(location.long.value));
	} else if(location.hasOwnProperty("northing") && location.hasOwnProperty("easting")){
		var osr = new OSRef(parseFloat(location.easting.value), parseFloat(location.northing.value));
		var ll = osr.toLatLng();
		latLng = new google.maps.LatLng(ll.lat, ll.lng);
	}
	return latLng;
}

function locVis(data, map) {
    var results = data.results.bindings;
	var infowindow = new google.maps.InfoWindow({
		content: "temp"
	});
    for (i = 0; i < results.length; i++) {
		var location = results[i];
		var latLng = getLatLng(location);
		var content = "<div>";
		for(var key in location){
			content += "<b>" + key + ":</b> " + location[key].value + "<br/>";
		}
		content += "</div>";
		var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "test"
        });
		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
			return function() {
				infowindow.setContent(content);
				infowindow.open(map,marker);
			};
		})(marker,content,infowindow));
    }
}
