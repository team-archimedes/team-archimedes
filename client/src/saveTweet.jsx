import React from 'react';

export default class SaveTweet extends React.Component {
  dragulaDecorator (componentBackingInstance, func = this.props.save) {
    if (componentBackingInstance) {

      let options = {copy: true};

      dragula([componentBackingInstance, document.querySelector('.positive-tweets'), document.querySelector('.negative-tweets')], options)
      .on('drop',(el, target, source) => {
        console.log('hello')
        if(target === componentBackingInstance) {
          func(el, source)
        }
      });
    }
  }
  render() {
    return (
        <img src="./images/folder_icon.png" alt="" className="save"/>
    )
  }
}
