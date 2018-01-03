import React from 'react';
import styled from 'styled-components';

const Tweets = styled.div`
  width: 20%;
  height: 500px;
  border: 1px solid black;
  float: right;
  margin-top: 5%;
`;

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positiveTweets: []
    }
  }



  render() {
    return (
      <Tweets>
        Positive Tweets
        <ul>
          {this.state.positiveTweets.map((tweet, i) => <li key={i} tweet={tweet}>{tweet}</li>)}
        </ul>
      </Tweets>
    )
  }
}


export default PositiveTweets;
