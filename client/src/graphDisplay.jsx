import React from 'react';
import styled from 'styled-components';
var moment = require('moment');

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // come back and make this look better later - for now, not displaying timestamp, just score
    var x = ['x'];
    var score = ['score'];
    this.props.data.forEach((entry) => {
      // let d = moment(entry.searchHour).format('MM-DD-YY');
      // console.log('timestamp: ', entry.searchHour);
      if(entry.searchHour) {
        x.push(entry.searchHour);
      }
      score.push(100-entry.averageScore);
    });
    var graph = c3.generate({
      bindto: '#Graph',
      title: {
        text: "positivity score of "+this.props.term+" over time"
      },
      data: {
        // x: 'x',
        // xFormat: '%d',
        columns: [
          // x,
          score
        ]
      },

      // axis: {
      //   x: {
      //     type: 'timeseries',
      //     tick: {
      //       format: '%d'
      //     }
      //   }
      // }
    });
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
