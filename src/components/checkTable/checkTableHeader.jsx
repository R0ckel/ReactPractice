import React from 'react';

class CheckTableHeader extends React.Component {
	constructor(props){
		super(props);

    this.toHide = props.toHide || [];
		
		this.item = props.item;
	}

	render(){
    var tcells = []
    for (const key in this.item) {
      if (Object.hasOwnProperty.call(this.item, key)
          && !this.toHide.includes(key)) {
        tcells.push(key);
      }
    }
    tcells.push("Checked");
    tcells.push("Action");
		return(
			<thead className='capitalize'>
        <tr>
          {tcells.map(tcell => (
            <th key={this.item.id + tcell}>{tcell}</th>
          ))}
        </tr>
      </thead>
		)
	}
}

export default CheckTableHeader