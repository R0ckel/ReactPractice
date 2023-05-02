import React from 'react';
import styles from "../../css/app.module.css"
import {useSelector} from "react-redux";

export default function CheckTableHeader({template}) {
	const {cardViewFields} = useSelector(state => state.productList)
	const tableCells = [];
	for (const key in template) {
		if (Object.hasOwnProperty.call(template, key)
			&& cardViewFields.includes(key)
		) {
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
}