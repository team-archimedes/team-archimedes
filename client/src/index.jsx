import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NegativeTweets from './negativeTweets.jsx';
import PositiveTweets from './positiveTweets.jsx';
import GraphDisplay from './GraphDisplay.jsx';
import BarDisplay from './barDisplay.jsx';
import Search from './Search.jsx'
import axios from 'axios';
import bodyParser from 'body-parser';
import sentiment from 'sentiment';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  font-weight: bold;
`;

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      tweets: [],
      negativeTweets: [],
      positiveTweets: [],
      average: 0
  	}
    this.getAverage = this.getAverage.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this)
  }

  getAllTweets(term) {
    // first reset state so that new tweets will render properly.
    this.setState({
      negativeTweets: [],
      positiveTweets: []
    });

    axios.post('/search', {searchTerm: term}).then((res) => {
      console.log("res ", res.data);
      this.setState({
        tweets: res.data
      });
      this.getAverage(this.state.tweets);
    });
  }

  getAverage(tweets) {
    var count = 0;

    tweets.map((message) => {
      var score = sentiment(message.tweetBody).score;
      count += score;
      if ( score < 0 ) {
        // add negative tweets to negativeTweets array
        this.setState({
          negativeTweets: [...this.state.negativeTweets, message]
        });
      } else if ( score > 0 ) {
        // add positive tweets to positiveTweets array
        this.setState({
          positiveTweets: [...this.state.positiveTweets, message]
        });
      } 
    });
    var newAverage = count/tweets.length;
    this.setState({
      average: newAverage
    });
    console.log('negative tweets: ', this.state.negativeTweets);
    console.log('positive tweets: ', this.state.positiveTweets);
  }

  componentWillMount() {
    // default search for pizza.
    this.getAllTweets('pizza');
  }

  render () {
  	return (
      <div>
        <Title>What the Flock?</Title>
        <Search getAllTweets={this.getAllTweets}/>
        <BarDisplay />
        <NegativeTweets tweets={this.state.negativeTweets}/>
        <PositiveTweets tweets={this.state.positiveTweets}/>
        <GraphDisplay/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
