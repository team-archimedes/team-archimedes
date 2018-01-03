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
      average: 0
  	}
    this.getAverage = this.getAverage.bind(this)
  }

  getAllTweets(term) {
    console.log('searched ', term)
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
      count+=score;
    });
    var newAverage = count/tweets.length;
    this.setState({
      average: newAverage
    });

    console.log('new average ', this.state.average)
  }

  componentDidMount() {
    this.getAllTweets('pizza');
  }

  render () {
  	return (
      <div>
        <Title>What the Flock?</Title>
        <Search getAllTweets={this.getAllTweets.bind(this)}/>
        <BarDisplay />
        <NegativeTweets/>
        <PositiveTweets/>
        <GraphDisplay/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
