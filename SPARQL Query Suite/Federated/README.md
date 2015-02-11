![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/logo.png "GMDSP")
# Federated SPARQL Queries

Here are a small set of federated SPARQL queries that illustrate how to query other data sources and integrate them with data from [GMDSP](http://data.gmdsp.org.uk).

### Basics of Federated Queries
Federated queries make use of the SERVICE keyword to direct a sub-query to a different SPARQL endpoint. Here the sub query is directed to the endpoint provided by [Open Data Communities](http://opendatacommunities.org).
```sparql
SERVICE <http://opendatacommunities.org/sparql> {
		?s ?p ?o
	}
```

### Integrating Results
To make use of this it is possible to select data from GMDSP and use it in your sub-query to the other endpoint.

In the following query the number of volunteers per ward in 2014-2015/Q1 is found and then the ward URI is used in a query to [Ordnance Survey's](http://data.ordnancesurvey.co.uk/datasets) SPARQL endpoint to retrieve the centre point of each ward;
```sparql
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX prop: <http://data.gmdsp.org.uk/data/manchester/volunteers/stats/ward/prop/>
PREFIX stats: <http://data.gmdsp.org.uk/data/manchester/volunteers/stats/>
PREFIX tff: <http://reference.data.gov.uk/id/government-half/2014-2015/>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
SELECT DISTINCT ?count ?label ?lat ?long
WHERE {
	?obv rdf:type qb:Observation ;
	qb:dataSet stats:ward ;
	prop:period tff:Q1 ;
	prop:area ?ward ;
	prop:count ?count .
	?ward owl:sameAs ?ordRef .
	SERVICE <http://data.ordnancesurvey.co.uk/datasets/os-linked-data/apis/sparql> {
		?ordRef rdfs:label ?label ;
		geo:lat ?lat ;
		geo:long ?long .		 
	}
}
LIMIT 50
```

This query can be run on [GMDSP's SPARQL endpoint](http://data.gmdsp.org.uk/sparql) and should return results akin to this;
no|count|label|lat|long
---|---|---|---|---
1|7|Ancoats and Clayton|53.486556|-2.187806
2|11|Ardwick|53.466493|-2.214779
3|2|Baguley|53.389682|-2.287013
...|...|...|...|...
