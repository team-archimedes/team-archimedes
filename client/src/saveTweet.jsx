import React from 'react';

export default class SaveTweet extends React.Component {
  dragulaDecorator (componentBackingInstance, func = this.props.save) {
    if (componentBackingInstance) {
      let options = {};
      dragula([componentBackingInstance], options)
      .on('drop',(el) => func(el));
    }
  }
  render() {
    return (
        <img src="./images/folder_icon.png" alt="" className="save"/>
    )
  }
}
