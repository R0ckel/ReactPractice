import React from 'react';

class MenuItem extends React.Component {
  constructor(props){
    super(props);
    this.item = props.item;
    this.updater = props.updater;
    this.state = {chosen: props.item.chosen};

    this.setCurrentAsChosen = this.setCurrentAsChosen.bind(this);
  }

  setCurrentAsChosen(){
    if (!this.state.chosen){
      this.props.updater(this.item.index)
    }
  }

  render(){
    return(
      <li className={`menuItem ${this.state.chosen?"chosen":"dynamic"}`} onClick={this.setCurrentAsChosen}>
        <input type="radio" name="mainMenu"
          value={this.item} defaultChecked={this.state.chosen} key={this.item.id} id={this.item.id}/>
        <label htmlFor={this.item.id}>{this.item.name}</label>
      </li>
    )
  }
}

export default MenuItem