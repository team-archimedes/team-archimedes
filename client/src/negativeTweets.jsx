import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';

const Tweets = styled.div``;

class NegativeTweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tweets className="col col-3-of-6">
        <div className="row">
          <div className="columnTitle col col-6-of-6">
            <h3>Negative Tweets</h3>
          </div>
          <ul>
            {this.props.tweets.map((tweet, i) => <Tweet key={i} tweet={tweet}></Tweet>)}
          </ul>
        </div>
      </Tweets>
    )
  }
}

export default NegativeTweets;
