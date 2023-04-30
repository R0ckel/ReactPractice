import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../css/app.module.css'

function MenuItem(props) {
  const { item, currentCategory } = props;
  const chosen = currentCategory === item

  return (
	  <Link to={`/categories/${item.name}`} className={styles.noLink}>
		  <li className={`${styles.menuItem} ${chosen ? styles.chosen : styles.dynamic}`}>
			  <input type='radio' name='mainMenu' value={item} defaultChecked={chosen} key={item.id} id={item.id}/>
			  <label htmlFor={item.id}>{item.name}</label>
		  </li>
	  </Link>
  );
}

export default MenuItem