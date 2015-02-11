# GMDSP Visualisations

This document covers how to create some basic visualisations using GMDSP data. All necessary javascript code is contained within the folder **/js**.

### Querying the data
Details of how to query the data store using javascript can be found [here](http://data.gmdsp.org.uk/docs#json-p).

e.g. utilising [JQuery](http://jquery.com/)
```javascript
queryUrl = 'http://data.gmdsp.org.uk/sparql.json?query=SELECT+%2A+WHERE+%7B%3Fs+%3Fp+%3Fo%7D+LIMIT+10'

$.ajax({
	dataType: 'jsonp',
	url: queryUrl,
	success: function(data) {
		// callback code here
		alert('success!');
	}
});
```

### Location Visualisation
This visualisation makes use of the [Google Map API](https://developers.google.com/maps/) and the [JSCoord](http://www.jstott.me.uk/jscoord/) library plots the location of items on a map.

To use include the [Google Map API](https://developers.google.com/maps/), [JSCoord](http://www.jstott.me.uk/jscoord/) library and js/mapVis.js in your page;
```html
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
<script src="js/mapVis.js"></script>
<script src="js/jscoord.js"></script>
```

Create a div that can be used to contain the map;
```html
<div id="map-canvas"></div>
```

Utilise a query such as this to find the locations of certain object;
```sparql
PREFIX light: <http://data.gmdsp.org.uk/def/council/streetlighting/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX locn: <http://www.w3.org/ns/locn#>
PREFIX ord: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
SELECT ?wattage ?northing ?easting
WHERE {
	?light rdf:type light:Streetlight ;
		light:wattage ?wattage ;
		locn:location ?location .
	?location locn:geometry ?geometry .
	?geometry ord:northing ?northing ;
		ord:easting ?easting
}
LIMIT 100
```

Finally initialise the map and hand the JSON object returned from this query to the locVis() method;
```javascript
var map = initMap('map-canvas');
locVis(data, map);
```