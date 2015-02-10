function chartVis(data, canvas) {
    var chartData = [];
    var pieOptions = {
        segmentShowStroke: false,
        animateScale: true
    };
    var results = data.results.bindings;
    for (i = 0; i < results.length; i++) {
        var unit = results[i].label.value;
        var amount = parseFloat(results[i].count.value);
        var col = getRandomColor();
        chartData.push({value: amount, label: unit, color: col});
    }
    new Chart(canvas).Doughnut(chartData, pieOptions);
}

function getCanvas(canvasId) {
	var chartDiv = document.getElementById(canvasId);
    return chartDiv.getContext("2d");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}