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
import dragula from 'react-dragula';
import SaveTweet from './saveTweet.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Modal from 'react-modal';
import IconButton from 'material-ui/IconButton';
import ActionNavigationClose from 'material-ui/svg-icons/navigation/close';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import UserModal from './userModal.jsx';
import Cookies from 'universal-cookie';

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
      lastSearchTerm: 'flock',
      graphData: [],
      graphMode: false, // when user clicks 'view history of ___', changes to true and renders graphDisplay 
      loading: true,
      savedTweets: [],
      clicked: false,
      clickedUser: '',
      isDragging: false,
      authenticated: false,
  	}
    this.getAverage = this.getAverage.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.resetGraphMode = this.resetGraphMode.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.storeUser = this.storeUser.bind(this);
    this.handleFaves = this.handleFaves.bind(this);
  }

  showGraph(e) {
    e.preventDefault()
    this.setState({
      graphMode: true
    });
  }

  clickHandler(user) {
		this.setState({clicked: !this.state.clicked}, () => {
      this.setState({user: this.state.clickedUser})
    })
  }
  
  closePorfile() {

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
    axios.post('/database', {average: newAverage, searchTerm: searchTerm});
  }

  handleDrop({idx, type}) {
    let positiveTweets = this.state.positiveTweets;
    let negativeTweets = this.state.negativeTweets;
    let tweet;
    if (type === 'positiveTweets') {
      tweet = positiveTweets.splice(idx, 1)[0]
      tweet.score = -tweet.score
      negativeTweets.splice(idx, 0, tweet)

    } else if (type === 'negativeTweets') {
      tweet = negativeTweets.splice(idx, 1)[0]
      tweet.score = -tweet.score
      positiveTweets.splice(idx, 0, tweet);
    }
    this.setState({
      negativeTweets,
      positiveTweets,
      tweets: negativeTweets.concat(positiveTweets)
    }, () => {
      this.getAverage(this.state.tweets, 'flock')
    })
  }

  storeUser(userId) {
    const cookies = new Cookies();
    let user = cookies.get('userId')
    if (!user) {
      cookies.set('userId', userId);
      this.setState({
        authenticated: true
      }, () => console.log(this.state.authenticated))
    }
  }

  handleSave({ idx, type }) {
    let tweet;
    const cookies = new Cookies();
    if(type === 'positiveTweets') {
      tweet = this.state.positiveTweets[idx];
    } else {
      tweet = this.state.negativeTweets[idx];
    }
    const userId = cookies.get('userId')
    const favorite = tweet.user_name;
    if (userId) {
      axios.post('/favorites', {userId, favorite})
      .then((fav) => console.log('stored favorite', fav))
    }
  }

  handleDrag() {
    this.setState({
      isDragging: !this.state.isDragging
    })
  }

  handleFaves() {
    const cookies = new Cookies();
    axios.get('/favorites', {
      headers: {'userId': cookies.get('userId')}
    })
    .then(response => {
      console.log('resp', response)
    })
  }

  componentWillMount() {
    this.getAllTweets('flock');
  }

  componentDidMount() {
    const cookies = new Cookies();
    let user = cookies.get('userId')
    if(user) {
      this.setState({
        authenticated: true
      })
    }
  }

  render () {
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
      closeButton: {
        right: "-90%",
        bottom: 25
      },
      content : {
        position: 'absolute',
        top: 40,
        left: 240,
        right: 240,
        bottom: 40,
        border: '1px solid rgb(204, 204, 204)',
        background: 'rgb(255, 255, 255)',
        overflow: 'auto',
        borderRadius: 4,
        outline: 'none',
        padding: 20
      }
    };
    const { authenticated } = this.state;
    if (!this.state.loading) {
      if(!this.state.graphMode) {
        return (
          <MuiThemeProvider>
          <div className="row">
            { !authenticated ?
              <UserModal storeUser={this.storeUser}/>:
              null
            }
            <div className="siteNav header col col-6-of-6">
              <h1>What the Flock?</h1>
              <img src="./images/poop_logo.png" alt="" className="logo"/>
            </div>
            <Modal
              isOpen={this.state.clicked}
              ariaHideApp={false}
              // onAfterOpen={afterOpenFn}
              // onRequestClose={requestCloseFn}
              // closeTimeoutMS={n}
              style={styles}
              contentLabel="Modal" 
            >
              <h1>User Profile</h1>
              <IconButton
                iconStyle={styles.mediumIcon}
                style={Object.assign(styles.medium, styles.closeButton)}
                onClick={this.clickHandler}
              >
                <ActionNavigationClose/>
              </IconButton> 
              <a className="twitter-timeline"
                href={`https://twitter.com/${this.state.clickedUser}`}>
                Tweets by @{this.state.clickedUser}
              </a>
            </Modal>
            <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
            <div id="error"></div>
            {
              authenticated ?
              <SaveTweet save={this.handleSave} handleFaves={this.handleFaves} isDraggingging={this.state.isDraggingging}/>:
              null
            }
            <BarDisplay percentage={this.state.average} lastSearchTerm={this.state.lastSearchTerm} loading={this.state.loading} showGraph={this.showGraph}/>
            <NegativeTweets className="tweetColumns row" dragging={this.handleDrag} drop={this.handleDrop} clickHandler={this.clickHandler} tweets={this.state.negativeTweets}/>
            <PositiveTweets className="tweetColumns row" dragging={this.handleDrag} drop={this.handleDrop} clickHandler={this.clickHandler} tweets={this.state.positiveTweets}/>
          </div>
          </MuiThemeProvider>
        )
      } else {
        	return (
            <div className="row">
              <div className="siteNav header col col-6-of-6">
                <h1>What the Flock?</h1>
                <img src="./images/poop_logo.png" alt="" className="logo"/>
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
          <h1>What the Flock?</h1>
          <img src="./images/poop_logo.png" alt="" className="logo"/>
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

export default DragDropContext(HTML5Backend)(App)
