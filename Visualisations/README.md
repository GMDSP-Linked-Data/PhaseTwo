![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/logo.png "GMDSP")
# Visualisations

This document covers how to create some basic visualisations using GMDSP data. All necessary javascript code is contained within the folder **/js**.

### Querying the data
Details of how to query the data store using javascript can be found [here](http://data.gmdsp.org.uk/docs#json-p).

e.g. utilising [JQuery](http://jquery.com/);
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

Utilise a query such as this to find the locations of certain objects;
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

The results should look something like this;

![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/location.png "Location Visualisation")

### Heatmap Visualisation
This visualisation uses [Google Map API](https://developers.google.com/maps/) to plot a heat map based on a series of points.

To use include the [Google Map API](https://developers.google.com/maps/) with the heatmap visualisation as well as [JSCoord](http://www.jstott.me.uk/jscoord/) and js/mapVis.js;
```html
<script src="https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=true_or_false"></script>
<script src="js/jscoord.js"></script>
<script src="js/mapVis.js"></script>
```

Create a div that can be used to contain the map;
```html
<div id="map-canvas"></div>
```

Query for a set of points;
```sparql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fire: <http://data.gmdsp.org.uk/def/fire-and-rescue/>
PREFIX spatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
SELECT ?northing ?easting
WHERE {
	?incident rdf:type fire:Incident ;
		fire:incidentLocation ?location .
	?location spatial:northing ?northing ;
		spatial:easting ?easting
}
```

Finally initialise the map and hand the JSON object returned from this query to the heatVis() method;
```javascript
var map = initMap('map-canvas');
heatVis(data, map);
```

The results should look something like this;

![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/heatmap.png "Heatmap Visualisation")

### Chart Visualisation
This visualisation uses [ChartJS](http://www.chartjs.org/) to visualise data as a pie chart.

To use include [ChartJS](http://www.chartjs.org/) and js/chartVis.js in your page;
```html
<script src="js/chart.js"></script>
<script src="jschartVis.js"></script>
```

Create a canvas to place the chart in;
```html
<canvas id="chart-canvas" width="400" height="400"></canvas>
```

Query for some data - note the visualisation expects the properties "label" and "count" to be present to visualise the data;
```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX lib: <http://data.gmdsp.org.uk/data/manchester/libraries/stats/prop/>
PREFIX stat: <http://statistics.data.gov.uk/doc/statistical-geography/>

SELECT ?label (SUM(?loanCount) AS ?count)
WHERE{
	?obv lib:category ?category ;
		lib:count ?loanCount .
	?category rdfs:label ?label
}
GROUP BY ?label
ORDER BY DESC(?count)
```

Finally retrieve the canvas using getCanvas() then call chartVis() handing it the data and the canvas;
```javascript
var chart = getCanvas('chart-canvas');
chartVis(data, chart);
```

The results should look something like this;

![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/pichart.png "Chart Visualisation")


### Licensing
When making use of any of these visualisations please ensure you include the appropriate licensing file for the utilised libraries;
* [JQuery](http://jquery.com/)
* [Google Map API](https://developers.google.com/maps/)
* [JSCoord](http://www.jstott.me.uk/jscoord/)
* [ChartJS](http://www.chartjs.org/)