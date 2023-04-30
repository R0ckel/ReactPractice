import React from 'react';
import {ProductListContext} from "../../contexts/productListContext";
import styles from "../../css/app.module.css"

export default function CheckTableHeader (props) {
	const {template} = props;

	return <ProductListContext.Consumer>
		{({attrsToHide})=>{
			const tableCells = [];
			for (const key in template) {
				if (Object.hasOwnProperty.call(template, key)
					&& !attrsToHide.includes(key)) {
					tableCells.push(key);
				}
			}
			tableCells.push("Checked");
			tableCells.push("Action");
			if (template) {
				return (
					<thead className={`${styles.capitalize}`}>
					<tr>
						{tableCells.map(tableCell => (
							<th key={template.id + tableCell}>{tableCell}</th>
						))}
					</tr>
					</thead>
				)
			}
			return <></>
		}}
	</ProductListContext.Consumer>
}