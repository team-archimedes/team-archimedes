import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';
import dragula from 'react-dragula';
const Tweets = styled.div``;

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props);
    // this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }
  dragulaDecorator (componentBackingInstance) {
    console.log(componentBackingInstance);
    if (componentBackingInstance) {
      let options = {};
      dragula([componentBackingInstance], options);
    }
  }

  render() {
    return (
      <Tweets className="col col-3-of-6" style={{backgroundColor: 'rgba(39, 174, 96, .2'}}>
        <div className="row">
          <div className="columnTitle col col-6-of-6">
            <h3>Positive Tweets</h3>
          </div>
          <div ref={this.dragulaDecorator} className="container">
            {this.props.tweets.map((tweet, i) => <Tweet key={i} tweet={tweet} />)}
          </div>
        </div>
      </Tweets>
    )
  }

}


export default PositiveTweets;
