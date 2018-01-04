import React from 'react';
import styled from 'styled-components';
import './style/search.scss';

const SearchContainer = styled.input``;

const SubmitButton = styled.button``;

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
      <div className="container">
        <div className="container__item">
          <form className="form" 
            onSubmit={(e) => {
              e.preventDefault();
              this.props.getAllTweets(this.state.searchTerm);
            }}>
            <SearchContainer
              type="text"
              className="form__field"
              placeholder="search..."
              value={this.state.searchTerm}
              onChange={this.handleInputChange.bind(this)}
            ></SearchContainer>
            <SubmitButton
              type="submit" 
              className="btn btn--primary btn--inside uppercase"
            >
            Send
            </SubmitButton>
          </form>
        </div>
      </div>
    )
  }
}

export default Search;
      // <div>
      //   <form>
      //     <SearchContainer type="text" placeholder='search...' value={this.state.searchTerm} onChange={this.handleInputChange.bind(this)} >
      //     </SearchContainer>
      //     <SubmitButton onClick={(e) => {
      //       e.preventDefault();
      //       this.props.getAllTweets(this.state.searchTerm);
      //       console.log('IN THE ONCLICK')
      //     }}>
      //       Submit
      //     </SubmitButton>
      //   </form>
      // </div>
