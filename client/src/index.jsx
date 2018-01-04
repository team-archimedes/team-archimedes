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
import './style/baseStyle.scss';

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
      average: 50
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
    tweets.map((message) => {
      var score = sentiment(message.tweetBody).score;
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
    var newAverage = (this.state.negativeTweets.length / this.state.tweets.length) * 100
    this.setState({
      average: newAverage
    });
  }

  componentWillMount() {
    // default search for pizza.
    this.getAllTweets('pizza');
  }

  render () {
  	return (
      <div>
        <div className="header">
          <h1>What the Flock?</h1>
          <img src="./images/poop_logo.png" alt="" className="logo"/>
        </div>
        <Search getAllTweets={this.getAllTweets.bind(this)}/>
        <BarDisplay percentage={this.state.average}/>
        <NegativeTweets tweets={this.state.negativeTweets}/>
        <PositiveTweets tweets={this.state.positiveTweets}/>
        <GraphDisplay/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
