import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NegativeTweets from './negativeTweets.jsx';
import PositiveTweets from './positiveTweets.jsx';
import GraphDisplay from './GraphDisplay.jsx';
import BarDisplay from './barDisplay.jsx';
import Search from './Search.jsx';
import PreviousSearches from './PreviousSearches.jsx';
import Loader from './loader.jsx';
import axios from 'axios';
import bodyParser from 'body-parser';
import sentiment from 'sentiment';
import styled from 'styled-components';
import './style/baseStyle.scss';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      tweets: [],
      negativeTweets: [],
      positiveTweets: [],
      previousSearches: [],
      average: 50,
      searchTerm: '',
      lastSearchTerm: 'trump',
      graphData: [],
      graphMode: false, // when user clicks 'view history of ___', changes to true and renders graphDisplay 
      loading: true
  	}
    this.getAverage = this.getAverage.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.resetGraphMode = this.resetGraphMode.bind(this);
  }

  showGraph(e) {
    e.preventDefault()
    this.setState({
      graphMode: true
    });
  }

  resetGraphMode(e) {
    e.preventDefault();
    this.setState({
      graphMode: false
    });
  }

  handleInputChange(e) {
    $('.search.container').removeClass('error');
    this.setState({
      searchTerm: e.target.value
    });
  }

  getHistory() {
    axios.get('/database', {params:{searchTerm: this.state.lastSearchTerm}}).then((response) => {
      console.log('response.data: ', response.data);
      this.setState({
        graphData: response.data // graph will now re-render with data from most recently searched term.
      });
    });
  }

  submitQuery(e) {
    e.preventDefault();
    this.state.searchTerm === '' ? $('.search.container').addClass('error') : this.getAllTweets(this.state.searchTerm);
  }

  getAllTweets(term) {
    // first reset state so that new tweets will render properly.
    this.setState({
      negativeTweets: [],
      positiveTweets: [],
      loading: true,
      graphMode: false
    });

    axios.post('/search', {searchTerm: term}).then((res) => {
      this.setState({
        tweets: res.data,
        lastSearchTerm: term,
        searchTerm: '',
        previousSearches: [...this.state.previousSearches, term],
        loading: false
      });
      this.getAverage(this.state.tweets, term);
      this.getHistory();
    });
  }

  getAverage(tweets, searchTerm) {
    tweets.map((message) => {
      var score = sentiment(message.tweetBody).score;
      message.score = score;

      var text = message.tweetBody.split(' ');

      // parse each word in tweet and url-ify if it's a url
      text.forEach((word,idx) => {
        if ( word.includes('http') ) {
          text[idx] = '<a target=\"_blank\" href=\'' + word + '\'>' + word + '</a>';
        } else if (word.includes('@')) {
          text[idx] = '<a target=\"_blank\" href=\'https://twitter.com/' + word.slice(1) + '\'>' + word + '</a>';
        }
      });

      message.tweetBody = text.join(' ');

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

    var newAverage = (this.state.negativeTweets.length / this.state.tweets.length) * 100;

    this.setState({
      average: newAverage
    });

    axios.post('/database', {average: newAverage, searchTerm: searchTerm});
  }

  componentWillMount() {
    // default search.
    this.getAllTweets('trump');
  }

  render () {
    if (!this.state.loading) {
      if(!this.state.graphMode) {
        return (
          <div className="row">
            <div className="siteNav header col col-6-of-6">
              <h1>The Sentimentalyzer</h1>
            </div>
            <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
            <div id="error"></div>
            <BarDisplay percentage={this.state.average} lastSearchTerm={this.state.lastSearchTerm} loading={this.state.loading} showGraph={this.showGraph}/>
            <NegativeTweets className="tweetColumns row" tweets={this.state.negativeTweets}/>
            <PositiveTweets className="tweetColumns row" tweets={this.state.positiveTweets}/>
          </div>
        )
      } else {
        	return (
            <div className="row">
              <div className="siteNav header col col-6-of-6">
                <h1>The Sentimentalyzer</h1>
              </div>
              <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
              <div id="error"></div>
              <GraphDisplay data={this.state.graphData} term={this.state.lastSearchTerm} resetGraphMode={this.resetGraphMode}/>
            </div>
          )
      }
      
    } else {
      return(
        <div className="row">
        <div className="siteNav header col col-6-of-6">
          <h1>The Sentimentalyzer</h1>
        </div>
        <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
        <div id="error"></div>
        <BarDisplay percentage={this.state.average} lastSearchTerm={this.state.lastSearchTerm} loading={this.state.loading}/>
        <Loader/>
      </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
