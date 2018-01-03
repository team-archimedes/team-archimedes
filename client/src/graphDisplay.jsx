import React from 'react';
import styled from 'styled-components';

const Graph = styled.div`
  width: 50%;
  height: 400px;
  display: inline block;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid black;
`;

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    return (
      <Graph>
        GRAPH GOES HERE
      </Graph>
    )
  }
}

export default GraphDisplay;
