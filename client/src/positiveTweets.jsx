import React from 'react';

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positiveTweets: []
    }
  }


  render() {
    return (
      <div>
        Positive Tweets
        <ul>
          {this.state.positiveTweets.map((tweet, i) => <li key={i} tweet={tweet}>{tweet}</li>)}
        </ul>
      </div>
    )
  }
}

export default PositiveTweets;
