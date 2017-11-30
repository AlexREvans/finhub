var d3Wrapper = require('./d3Wrapper.js');

module.exports = function(circleRadius) { return d3Wrapper(function(d3, svg) {

    width =  300
    height = 450
  
    circleData = [
      { cx: 20, cy: 25, r: circleRadius, fill: 'blue' },
      { cx: 60, cy: 25, r: 20, fill: 'green'}
    ]

    svg.attr('width', width)
              .attr('height', height)
              .append('g')
              .selectAll('circle')
              .data(circleData)
              .enter()
              .append('circle')
              .attr('cx', (d) =>  d.cx)
              .attr('cy', (d) =>  d.cy)
              .attr('r', (d) => d.r)
              .attr('fill', (d) => d.fill);

              return svg;
})};