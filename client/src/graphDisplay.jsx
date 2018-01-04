import React from 'react';
import styled from 'styled-components';

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    var time = [];
    var score = [];
    this.props.data.forEach((entry) => {
      let d = new Date(entry.searchHour);
      time.push(d);
      score.push(100-entry.averageScore);
    });
    var trace = {
      x: time,
      y: score,
      type: 'scatter'
    };

    var layout = {
      title: 'positivity ratio of ' + this.props.term + ' over time',
      yaxis: {
        range: [0, 100]
      },

    }

    var data = [trace];

    Plotly.newPlot('Graph', data, layout);
  }


  render() {
    return (
      <div id="Graph" style={{'height': '500px', 'width': '500px'}}></div>
      )
  }
}

export default GraphDisplay;
