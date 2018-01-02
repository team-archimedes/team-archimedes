import React from 'react';

class NegativeTweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      negativeTweets: []
    }
  }

  


  render() {
    return (
      <div>
        Negative Tweets
        <ul>
          {this.state.negativeTweets.map((tweet, i) => <li key={i} tweet={tweet}>{tweet}</li>)}
        </ul>
      </div>
    )
  }
}

export default NegativeTweets;
