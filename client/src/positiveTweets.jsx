import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';

const Tweets = styled.div`
  width: 20%;
  height: 500px;
  border: 1px solid black;
  float: right;
  margin-top: 5%;
  overflow: scroll;
`;

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tweets>
        Positive Tweets
        <ul>
          {this.props.tweets.map((tweet, i) => <Tweet key={i} tweet={tweet} />)}
        </ul>
      </Tweets>
    )
  }
}


export default PositiveTweets;
