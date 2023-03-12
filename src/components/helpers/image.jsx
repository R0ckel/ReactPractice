import React from 'react';

class Image extends React.Component{
  render(){
      return(
      <div className={this.props.className}>
        <img src={this.props.src} alt="img"></img>
      </div>
    )
  }
}

export default Image