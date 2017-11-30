var d3 = require("d3");
var jsdom = require("jsdom");

module.exports = function(svgTransformer) {
    var document = (new jsdom.JSDOM('<!doctype html><html></html>')).window.document;
    var svg = d3.select(document.body).append("svg");

    svg = svgTransformer(d3, svg);

    return svg.node().outerHTML;
};