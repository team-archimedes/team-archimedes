import React from 'react';
import './style/tweet.scss';
import IconButton from 'material-ui/IconButton';
import ActionAccountCircles from 'material-ui/svg-icons/action/account-circle';

/**
 * npm install react-modal
 * npm install material-ui
 */

class Tweet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
			profilebutton: {
				right: "-90%",
				bottom: 25
			}
		};
			
	 return (
		<li className="tweetBody">
				<IconButton
						iconStyle={styles.smallIcon}
						style={Object.assign(styles.small, styles.profilebutton)}
						onClick={() => {this.props.clickHandler(this.props.tweet.user_name)}}
					>
          <ActionAccountCircles/>
        </IconButton> 
			<div className="header row">
				<img className="avatar" src={this.props.tweet.avatar_url}></img>
				<h3>
					<span>@</span>{this.props.tweet.user_name}
				</h3>
			</div>

			<div className="tweetText row">
				<p className="col col-6-of-6">{this.props.tweet.tweetBody}</p>
				<span className="timeStamp col right-3-of-6">{this.props.tweet.created_at}</span>
			</div>
			<hr/>
		</li>
		)
	}
}

export default Tweet;