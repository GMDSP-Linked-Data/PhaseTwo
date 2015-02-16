![alt text](https://github.com/GMDSP-Linked-Data/PhaseTwo/blob/master/Visualisations/img/logo.png "GMDSP")
# Ward Based SPARQL Queries 

Here are asmall set of SPARQL queries based around wards. These queries when run will give results at the ward level. 

### Example Fire Incidents
The following will query for the highest number of fire incidents between 2014 and 2015;

```sparql
#Find the wards with most incidents in 2014-2015

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fire: <http://vocab.resc.info/incident#>
PREFIX locn: <http://www.w3.org/ns/locn#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>

SELECT ?wardName (COUNT (?incident) AS ?numberOfIncidents)
WHERE {
	?incident rdf:type fire:IncidentRecord ;
		locn:location ?location ;
		fire:incidentRecordStartTimestamp ?time .
	?location locn:address ?address .
	?address locn:addressArea ?ward .
	?ward rdfs:label ?wardName .
	FILTER (?time >= "2014-01-01T00:00" && ?time <= "2015-01-01T00:00")
	?area owl:sameAs ?ward
} 
GROUP BY ?wardName 
ORDER BY DESC(?numberOfIncidents)
LIMIT 10
```

This query executed at [GMDSP SPARQL Endpoint](http://data.gmdsp.org.uk/sparql) should return results akin to;

no|wardName|numberOfIncidents
---|---|---
1|City Centre|74
2|Ancoats and Clayton|36
3|Ardwick|36
4|Harpurhey|30
5|Brinnington and Central|29
...|...|...

### Example Library Loans
The following will retrieve the loan statistics for Gorton North in December 2014.

```sparql
#Retrieve library loan statistics for a specific ward in December 2014.
#Gorton North - odc:E05000702
#Gorton South - odc:E05000703
#Levenshulme - odc:E05000707
#Some loan stats contain a total observation - the filter removes this from the results.

PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX lib: <http://data.gmdsp.org.uk/data/manchester/libraries/stats/prop/>
PREFIX stat: <http://statistics.data.gov.uk/doc/statistical-geography/>
PREFIX odc: <http://opendatacommunities.org/doc/geography/administration/wd/>
PREFIX month: <http://reference.data.gov.uk/id/month/>

SELECT ?categoryLabel ?loanCount
WHERE{
	?obv lib:category ?category ;
		lib:area odc:E05000702 ;
		lib:period month:2014-12 ;
		lib:count ?loanCount .
	?category rdfs:label ?categoryLabel .
	FILTER regex(?categoryLabel, "^((?!total).)*$", "i")
}
ORDER BY DESC(?count)
```

When executed results should be similar to;

no|categoryLabel|loanCount
---|---|---
1|Adult Fiction|559
2|Junior Fiction|370
3|Adult Non Fiction|358
4|Junior Non Fiction|118
5|Adult Spoken Word|49
...|...|...