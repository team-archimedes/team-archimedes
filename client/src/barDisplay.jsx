import React from 'react';
import $ from 'jquery';

class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// percentage: 0
		}
		setInterval(() => {
			var percent = this.props.average * 100;
			$('.horizontal .progress-fill span').each(function(){
	  		$(this).parent().css('width', percent + '%');
			});
		}, 100);

	}

	componentDidMount() {
  	var percent = this.props.average * 100;
		$('.horizontal .progress-fill span').each(function(){
  		$(this).parent().css('width', percent + '%');
		});
	}

	render() {
		return (
		<div className="container horizontal rounded">
		  <h2>Percentage</h2>
		  <div className="progress-bar horizontal">
		    <div className="progress-track">
		      <div className="progress-fill">
		        <span></span>
		      </div>
		    </div>
		  </div>
		</div>)
	}
}

export default BarDisplay