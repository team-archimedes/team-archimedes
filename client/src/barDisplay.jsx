import React from 'react';
import $ from 'jquery';

class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			percentage: 0
		}
		setInterval(() => {
			this.setState({
				percentage: this.state.percentage + 1
			})
			$('.horizontal .progress-fill span').each(function(){
  		var percent = $(this).html();
  		$(this).parent().css('width', percent);
		});
		},1000)
	}

	componentDidMount() {
		$('.horizontal .progress-fill span').each(function(){
  		var percent = $(this).html();
  		$(this).parent().css('width', percent);
		});
	}

	render() {
		return (
		<div className="container horizontal rounded">
		  <h2>Percentage</h2>
		  <div className="progress-bar horizontal">
		    <div className="progress-track">
		      <div className="progress-fill">
		        <span>{this.state.percentage + '%'}</span>
		      </div>
		    </div>
		  </div>
		</div>)
	}
}

export default BarDisplay