import React from 'react';
import { DragSource } from 'react-dnd';
import './style/tweet.scss';

const Types = {
	item: 'tweet',
}

const itemSource = {
	beginDrag(props, monitor, component) {
		console.log(component)
		component.props.dragging();
		const item = {idx: props.id, type: props.type};
		return item;
	}, 
	endDrag(props, monitor, component) {

		component.props.dragging();
		if (!monitor.didDrop()) {
			return;
		}
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult();

	},
	isDragging(props, monitor) {
		return monitor.getItem().id = props.id
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Tweet extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	const { isDragging, connectDragSource } = this.props
	 return connectDragSource(
		<div className="tweetBody">
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
		</div>
		)
	}
}

// export default Tweet;

export default DragSource(Types.item, itemSource, collect)(Tweet);