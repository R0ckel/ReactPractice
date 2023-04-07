import React from 'react';
import {ProductListContext} from "../../contexts/productListContext";

class CheckTableHeader extends React.Component {
	render(){
		return <ProductListContext.Consumer>
			{({attrsToHide, currentProducts})=>{
				const tableCells = [];
				for (const key in currentProducts[0]) {
					if (Object.hasOwnProperty.call(currentProducts[0], key)
						&& !attrsToHide.includes(key)) {
						tableCells.push(key);
					}
				}
				tableCells.push("Checked");
				tableCells.push("Action");
				return(
					<thead className='capitalize'>
					<tr>
						{tableCells.map(tableCell => (
							<th key={currentProducts[0].id + tableCell}>{tableCell}</th>
						))}
					</tr>
					</thead>
				)
			}}
		</ProductListContext.Consumer>
	}
}

export default CheckTableHeader