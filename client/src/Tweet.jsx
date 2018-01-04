import React from 'react';

class Tweet extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	 return (
		<div>
			<div>
				<img src={this.props.tweet.avatar_url}></img>
			</div>

			<div>
				<h3><span>@</span>{this.props.tweet.user_name}</h3>
				<p>{this.props.tweet.tweetBody}</p>
			</div>
		</div>
		)
	}
}

export default Tweet;