var d3Wrapper = require('./d3Wrapper.js');
var chromatic = require('d3-scale-chromatic');

const sunburstTransformer = transactionsByTag =>
  ({
    name: "Some name",
    children: Object.keys(transactionsByTag).map(tag => ({
      name: tag,
      children: transactionsByTag[tag].map(transaction => ({
        name: transaction.name,
        value: transaction.amount
      }))
    }))
  })

const asD3 = function (root = flare) {
  return d3Wrapper(function (d3, svg) {

    var width = 960,
      height = 700,
      radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

    var y = d3.scalePow()
      .exponent(1.5)
      .range([0, radius]);

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var partition = d3.partition();

    var arc = d3.arc()
      .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function (d) { return Math.max(0, 5 + y(d.y0)); })
      .outerRadius(function (d) { return Math.max(0, y(d.y1)); });




    var g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    root = d3.hierarchy(root);
    root.sum(function (d) { return d.value; });
    g.selectAll("path")
      .data(partition(root).descendants())
      .enter().append("path")
      .attr("d", arc)
      .style("fill", function (d) { return color(d.data.name); })
      .append("title")
      .text(function (d) { return d.data.name + "\n" + formatNumber(d.value); });


    return svg;
  })
}

module.exports = transByTag => asD3(sunburstTransformer(transByTag))