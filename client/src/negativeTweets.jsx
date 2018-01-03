import React from 'react';
import styled from 'styled-components';

const Tweets = styled.div`
  width: 20%;
  height: 500px;
  border: 1px solid black;
  float: left;
  margin-top: 5%;
`;

class NegativeTweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      negativeTweets: []
    }
  }

  


  render() {
    return (
      <Tweets>
        Negative Tweets
        <ul>
          {this.state.negativeTweets.map((tweet, i) => <li key={i} tweet={tweet}>{tweet}</li>)}
        </ul>
      </Tweets>
    )
  }
}

export default NegativeTweets;
