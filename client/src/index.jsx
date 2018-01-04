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
      average: 0,
      query: ''
  	}
    this.getAverage = this.getAverage.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    })
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

  submitQuery(e) {
    {
      e.preventDefault();
      this.props.getAllTweets(this.state.searchTerm);
      this.setState({searchTerm: ''});
    }
  }

  getAverage(tweets) {
    var count = 0;

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
    
    this.setState({
      average: this.state.negativeTweets.length / this.state.tweets.length
    });

    console.log('negative tweets: ', this.state.negativeTweets);
    console.log('positive tweets: ', this.state.positiveTweets);
    console.log('average: ', this.state.average);
  }

  componentWillMount() {
    // default search for pizza.
    this.getAllTweets('pizza');
  }

  render () {
  	return (
      <div>
        <Title>What the Flock?</Title>
        <Search getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange} submitQuery={this.submitQuery}/>
        <BarDisplay average={this.state.average}/>
        <NegativeTweets tweets={this.state.negativeTweets}/>
        <PositiveTweets tweets={this.state.positiveTweets}/>
        <GraphDisplay/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
