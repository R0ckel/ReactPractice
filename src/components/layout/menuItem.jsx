import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../css/app.module.css'
import {useSelector} from "react-redux";

function MenuItem({item, currentCategory}) {
	const {baseUrl} = useSelector(state => state.baseAppUrl)
	const chosen = currentCategory === item

	return (
		<Link to={`${baseUrl}/${item}`} className={styles.noLink}>
			<li className={`${styles.menuItem} ${chosen ? styles.chosen : styles.dynamic}`}>
				<input type='radio' name='mainMenu' value={item} defaultChecked={chosen} key={item} id={item}/>
				<label htmlFor={item}>{item}</label>
			</li>
		</Link>
	);
}

export default MenuItem