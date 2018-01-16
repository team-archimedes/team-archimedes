import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';
import dragula from 'react-dragula';
const Tweets = styled.div``;

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props);
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }

  dragulaDecorator (componentBackingInstance, func = this.props.drag) {
    if (componentBackingInstance) {
      let options = {};
      dragula([componentBackingInstance, document.querySelector('.negative-tweets')], options)
      .on('drop',(el, target, source) => {
        if(source === componentBackingInstance && target === document.querySelector('.negative-tweets')) {
          func(el)
        }
      });
    }
  }

  render() {
    return (
      <Tweets className="col col-3-of-6" style={{backgroundColor: 'rgba(39, 174, 96, .2'}}>
        <div className="row">
          <div className="columnTitle col col-6-of-6">
            <h3>Positive Tweets</h3>
          </div>
          <div ref={this.dragulaDecorator} className="positive-tweets">
            {this.props.tweets.map((tweet, i) => <Tweet data={i} type="positiveTweets" key={i} tweet={tweet} />)}
          </div>
        </div>
      </Tweets>
    )
  }

}


export default PositiveTweets;
