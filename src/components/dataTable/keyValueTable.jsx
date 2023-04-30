import React from 'react';
import styles from '../../css/app.module.css';

export class KeyValueTable extends React.Component{
  constructor(props){
    super(props)

    this.item = props.item;
    this.toHide = props.toHide || [];
  }

  render(){
    var rows = []
    for (const key in this.item) {
      if (!this.toHide.includes(key)) {
        rows.push({ 
          key: key,
          value: this.item[key] 
        });
      }
    }

    return(
	    <table className={`${styles.smoothTable} ${styles.capitalize}`}>
		    <tbody>
		    {rows.map(row => (
			    <tr key={`${this.item.id}${row.key}`}>
				    <td>{row.key}</td>
				    <td>{row.value}</td>
			    </tr>
		    ))}
		    </tbody>
	    </table>
    )
  }
}