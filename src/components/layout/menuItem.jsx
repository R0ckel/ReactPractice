import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem(props) {
  const { item, currentCategory } = props;
  const chosen = currentCategory === item

  return (
    <Link to={`/categories/${item.name}`} className={'noLink'}>
      <li className={`menuItem ${chosen ? 'chosen' : 'dynamic'}`}>
        <input type='radio' name='mainMenu' value={item} defaultChecked={chosen} key={item.id} id={item.id} />
        <label htmlFor={item.id}>{item.name}</label>
      </li>
    </Link>
  );
}

export default MenuItem