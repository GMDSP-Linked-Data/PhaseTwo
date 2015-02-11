![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/logo.png "GMDSP")
# SPARQL Query Suite

This suite of SPARQL queries can be used as examples and as a basis for building SPARQL queries for the GMDSP datasets.

### Running the queries
To run the queries here simply copy and paste the query into the [GMDSP SPARQL Endpoint](http://data.gmdsp.org.uk/sparql).

### Query Prefixes
Each query should provide you with the basis for building a query targeted at that same dataset. As such each query will include the prefixes for ontologies used by that dataset e.g.;
```sparql
PREFIX pay: <http://reference.data.gov.uk/def/payment#>
```
Is included in the expenditure query to access the payment ontology.

Additionally other prefixes are included that might commonly also be referenced such as;
```sparql
PREFIX odc: <http://opendatacommunities.org/doc/metropolitan-district-council/>
```
Which is used to reference councils via the [Open Data Communities](http://opendatacommunities.org) URI prefix.

### Understanding the queries
Each query should utilise a naming scheme that makes it as easy to understand as possible. Additionally each query should contain a comment to explain what the query does;
```sparql
#Find the street address of allotments.

PREFIX alt: <http://data.gmdsp.org.uk/def/council/allotment/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
SELECT ?allotmentLabel ?streetAddress
WHERE {
	?allotment rdf:type alt:Allotment ;
		rdfs:label ?allotmentLabel ;
		vcard:hasAddress ?address .
	?address vcard:street-address ?streetAddress
}
LIMIT 100
```

### Other ways to query
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