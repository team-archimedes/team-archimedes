import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props)
    
  }


  render () {
    return (<div style={{textAlign: 'center', width: '100%', paddingTop: '20%'}}><div className='loader'></div></div>)
  }
  
}
export default Loader