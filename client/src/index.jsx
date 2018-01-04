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
      average: 50,
      searchTerm: '',
      lastSearchTerm: 'pizza'
  	}
    this.getAverage = this.getAverage.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }

  handleInputChange(e) {
    $('#error').text('');
    this.setState({
      searchTerm: e.target.value
    });
  }

  submitQuery(e) {
    e.preventDefault();
    this.state.searchTerm === '' ? $('#error').text('please enter a valid query.') : this.getAllTweets(this.state.searchTerm);
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
        tweets: res.data,
        lastSearchTerm: term,
        searchTerm: ''
      });
      this.getAverage(this.state.tweets, term);
    });
  }

  getAverage(tweets, searchTerm) {
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
    axios.post('/database', {average: newAverage, searchTerm: searchTerm}).then((res) => {
      console.log('average post success')
      // res.send(res)
    })
  }

  componentWillMount() {
    // default search for pizza.
    this.getAllTweets('pizza');
  }

  render () {
  	return (
      <div className="row">
        <div className="siteNav header col col-6-of-6">
          <h1>What the Flock?</h1>
          <img src="./images/poop_logo.png" alt="" className="logo"/>
        </div>
        <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
        <div id="error"></div>
        <BarDisplay percentage={this.state.average} lastSearchTerm={this.state.lastSearchTerm}/>
        <NegativeTweets className="tweetColumns row" tweets={this.state.negativeTweets}/>
        <PositiveTweets className="tweetColumns row" tweets={this.state.positiveTweets}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
