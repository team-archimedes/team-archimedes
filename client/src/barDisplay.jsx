import React from 'react';
import $ from 'jquery';
import './style/processBar.scss';

class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
		<div className="container horizontal rounded col col-6-of-6">
		  <span style={{fontSize: '2em'}}>{this.props.loading ? 'Loading...' : `Reactions to ${this.props.lastSearchTerm}`}</span>
		  <span style={{position: 'relative', float:'right', fontSize:'2em', color:'blue', textDecoration:'underline', cursor: 'pointer'}} onClick={this.props.showGraph}>{this.props.loading ? '' : `View History of ${this.props.lastSearchTerm}`}</span>
		  <div className="progress-bar horizontal">
		  <span className="negative">Negative</span><span className="positive">Positive</span>
		    <div className="progress-track">
					<span style={{position:'absolute', left: ((100 - this.props.percentage)/2) + this.props.percentage +'%', transition: 'left 2s', color: 'white', fontSize: '12px', lineHeight: '20px', fontFamily: `"Lato","Verdana",sans-serif`}}>{ Math.round(100 -this.props.percentage) + '%'}</span>
		      <div className="progress-fill" style={{width: this.props.percentage + '%'}}>
		        <span>{Math.round(this.props.percentage) + '%'}</span>
		      </div>
		    </div>
		  </div>
		</div>)
	}
}

export default BarDisplay