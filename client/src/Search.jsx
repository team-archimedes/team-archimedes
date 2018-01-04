import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.input`
  width: 50%;
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
  font-size: 12px;
  text-align: center;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <div>
        <form>
          <SearchContainer type="text" placeholder='show me how twitter feels about...' value={this.state.searchTerm} onChange={this.props.handleInputChange} >
          </SearchContainer>
          <SubmitButton onClick={this.props.submitQuery}>
            Submit
          </SubmitButton>
        </form>
      </div>
    )
  }
}

export default Search;
