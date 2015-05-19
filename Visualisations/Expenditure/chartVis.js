function visChart(data, canvas) {
    var chartData = [];
    var pieOptions = {
        segmentShowStroke: false,
        animateScale: true
    };
    var results = data.results.bindings;
    for (i = 0; i < results.length; i++) {
	if (Object.keys(results[i]).length > 0){
            var unit = results[i].unitLabel.value;
	    var amount = parseFloat(results[i].total.value);
            var col = getRandomColor();
            chartData.push({value: amount, label: unit, color: col});
	}
    }
    new Chart(canvas).Doughnut(chartData, pieOptions);
}

function getCanvas(canvasId) {
    return $("#" + canvasId).get(0).getContext("2d");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
