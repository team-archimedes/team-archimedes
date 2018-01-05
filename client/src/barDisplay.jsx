import React from 'react';
import $ from 'jquery';
import './style/processBar.scss';

class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClick(e) {
		e.preventDefault()
		console.log('click')
	}
	render() {
		return (
		<div className="container horizontal rounded col col-6-of-6">
		  <span style={{fontSize: '2em'}}>Reactions to {this.props.lastSearchTerm}</span>
		  <span style={{position: 'relative', float:'right', fontSize:'2em', color:'blue', textDecoration:'underline'}} onClick={this.handleClick}>View History</span>
		  <div className="progress-bar horizontal">
		  <span className="negative">Negative</span><span className="positive">Positive</span>
		    <div className="progress-track">
		      <div className="progress-fill" style={{width: this.props.percentage + '%'}}>
		        <span></span>
		      </div>
		    </div>
		  </div>
		</div>)
	}
}

export default BarDisplay