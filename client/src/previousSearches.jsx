import React from 'react';

class PreviousSearches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // {console.log('in previousSearches ', this.state.previousSearches)}
    return (
      <div>
      <div className="header">
        <h1>Recent searches</h1>
      </div>
      <div>
      {
        this.props.previousSearches.map((search, i) => {
        return <li key={i}>{search.searchTerm}</li>
        })
      }
    </div>
  </div>
    )
  }
}

export default PreviousSearches;
