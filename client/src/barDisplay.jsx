import React from 'react';
import $ from 'jquery';
class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	render() {
		return (
		<div className="container horizontal rounded col col-6-of-6">
		  <h2>Percentage</h2>
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