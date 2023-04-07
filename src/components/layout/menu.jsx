import React from 'react';
import MenuItem from './menuItem';

class Menu extends React.Component {
  constructor(props){
      super(props);

      this.items = props.items
      this.state = {
        chosenIndex: 0, 
      };

      this.updateMenu = this.updateMenu.bind(this);
  }

  updateKey(item){
    item.id = `${item.name}_id${item.index}${item.chosen?"T":"F"}`;
  }

  updateMenu(categoryIndex){
    for (const item of this.items) {
      if (item.index === categoryIndex){
        item.chosen=true;
        this.props.contentUpdater(item.name);
      }
      else {
        item.chosen=false;
      }
      this.updateKey(item);
    }
    this.setState(() => ({
      chosenIndex: categoryIndex
    }))
  }

  render(){
    return(
      <div className="menu">
        <ul className="menuList">
          {this.items.map((item) => (
            <MenuItem item={item} key={item.id} 
              updater={this.updateMenu}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default Menu