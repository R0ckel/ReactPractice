import React from 'react';
import styles from "../../css/app.module.css"
import {selectedProductsCount} from "../../contexts/reduxStore"
import {useSelector} from "react-redux";

function ListHeader({shown, category}) {
	const selected = useSelector(selectedProductsCount)
	return (
		<div className={`${styles.listHeader}`}>
			<span className='warning'>{category}</span>
			<span className='centered'>Shown: {shown}</span>
			<span className='aright'>Selected: {selected}</span>
		</div>
	);
}

export default ListHeader