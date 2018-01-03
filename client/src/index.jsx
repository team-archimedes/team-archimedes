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
      tweets: ["Fuck", "fuck", "fuck"],
      average: 0
  	}
    this.getAverage = this.getAverage.bind(this)
  }

  getAllTweets(term) {
    console.log('searched ', term)
    axios.post('/search', {searchTerm: term}).then((res) => console.log("res ",res.data))
  }

  getAverage(tweets) {
    // var messages = this.state.tweets;
    var count = 0;

    this.state.tweets.map((message) => {
      var score = sentiment(message).score;
      console.log('score ', score)
      count+=score;
    });
    var newAverage = count/this.state.tweets.length;
    console.log('average in getAverage ', newAverage)

    this.setState({
      average: newAverage
    })

    console.log('new average ', this.state.average)
  }

  componentDidMount() {
    this.getAverage(this.state.tweets);
    console.log('average ', this.state.average)
    console.log(sentiment("manik and jess are fucking gods"));
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
