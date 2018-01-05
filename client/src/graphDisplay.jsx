import React from 'react';
import styled from 'styled-components';

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
      type: 'scatter',
      connectgaps: true
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
      <div style={{width: '100%', height: '100%', position:'relative'}}>
      <button onClick={this.props.resetGraphMode}>back</button>
      <div id="Graph" style={{'height': '70vh', 'width': '90vh', 'margin': '0 auto', 'position': 'relative'}}></div>
      </div>
      )
  }
}

export default GraphDisplay;
