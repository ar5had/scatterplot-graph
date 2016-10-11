// converts mm:ss string to seconds in number format
function toSeconds(str) {
	var mins = +str.substr(0,2);
	var secs = +str.substr(3);
	return mins * 60 + secs;
}

// Setting margin
var margin = { top: 50, bottom: 50, left: 50, right: 50 };

// Setting height and width
var width = window.innerWidth - margin.right - margin.left;
var height = (window.innerHeight - 140 - margin.bottom - margin.top);


// setting scales
var xscale = d3.scaleLinear().range([0, width]);
var yscale = d3.scaleLinear().range([height, 0]);

// setting axises
var xaxis = d3.axisBottom(xscale).ticks(8);
var yaxis = d3.axisLeft(yscale).ticks(4);

// get request url
var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var graph = d3.select("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");	

// fetching data
$.getJSON(url, function(data, status) {
	if(status !== "success") {
		alert("data-fetching failed");
		return;
	}
	else{
		// doing useful stuff here.	
		var ranks = data.length + (10 - data.length % 10);
		var timeDiff = -toSeconds(data[0]["Time"]) + toSeconds(data[data.length - 1]["Time"]) + 5;
		yscale.domain([ranks, 1]);
		xscale.domain([timeDiff, 0]);
		
		// adding axises
		graph.append("g")
			.attr("id", "xaxis")
			.attr("transform", "translate(0," + height + ")")
			.call(xaxis)
		.append("text")
      .attr("transform","translate(" + (width - 100) + ", -10)")
      .attr("x", "15")
      .attr("class", "xinfo")
      .text("SECONDS BEHIND FASTEST TIME");
		
		graph.append("g")
			.attr("id", "yaxis")
			.call(yaxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", "15")
			.attr("class", "yinfo")
			.text("RANK");
	}
});