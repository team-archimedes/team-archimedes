import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }
  }

  handleInputChange(e) {
    // e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
    // console.log('searchTerm ', this.state.searchTerm)
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" value={this.state.searchTerm} onChange={this.handleInputChange.bind(this)} >
          </input>
          <button onClick={(e) => {
            e.preventDefault();
            this.props.getAllTweets(this.state.searchTerm);
            console.log('IN THE ONCLICK')
          }}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default Search;
