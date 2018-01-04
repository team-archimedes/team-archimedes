import React from 'react';
import styled from 'styled-components';
import './style/search.scss';

const SearchContainer = styled.input``;

const SubmitButton = styled.button``;

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="container__item">
          <form className="form" 
            onSubmit={this.props.submitQuery}>
            <SearchContainer
              type="text"
              className="form__field"
              placeholder="search..."
              value={this.props.searchTerm}
              onChange={this.props.handleInputChange}
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
