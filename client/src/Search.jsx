import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.input`
  width: 25%;
  height: 60px;
  border: 1px solid black;
  display: block;
  margin: 0 auto;
  font-size: 30px;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 80px;
  display:block;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

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
          <SearchContainer type="text" placeholder='search...' value={this.state.searchTerm} onChange={this.handleInputChange.bind(this)} >
          </SearchContainer>
          <SubmitButton onClick={(e) => {
            e.preventDefault();
            this.props.getAllTweets(this.state.searchTerm);
            console.log('IN THE ONCLICK')
          }}>
            Submit
          </SubmitButton>
        </form>
      </div>
    )
  }
}

export default Search;
