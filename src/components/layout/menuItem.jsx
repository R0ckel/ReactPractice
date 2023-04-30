import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import styles from '../../css/app.module.css'
import {MenuItemsContext} from "../../contexts/menuItemsContext";

function MenuItem(props) {
	const {baseUrl} = useContext(MenuItemsContext)
	const {item, currentCategory} = props;
  const chosen = currentCategory === item

  return (
	  <Link to={`${baseUrl}/${item.name}`} className={styles.noLink}>
		  <li className={`${styles.menuItem} ${chosen ? styles.chosen : styles.dynamic}`}>
			  <input type='radio' name='mainMenu' value={item} defaultChecked={chosen} key={item.id} id={item.id}/>
			  <label htmlFor={item.id}>{item.name}</label>
		  </li>
	  </Link>
  );
}

export default MenuItem