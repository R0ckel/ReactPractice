import React from 'react';
import MenuItem from './menuItem';
import {useParams} from "react-router-dom";
import styles from '../../css/app.module.css'

const Menu = ({items}) => {
  const {categoryName} = useParams()
  const currentCategory = Object.values(items).flat().find((x) => x === categoryName);

  if (currentCategory === undefined && items.length > 0) {
    return <></>
  }

  const updateKey = (item) => {
    item.id = `${item.name}_id${item.index}${item.chosen ? "T" : "F"}`;
  };

  const updateMenu = (categoryIndex) => {
    items.forEach((item) => {
      item.chosen = item.index === categoryIndex;
      updateKey(item);
    });
  };

  return (
	  <div className={styles.menu}>
      <ul className={styles.menuList}>
        {items.map((item) => (
          <MenuItem item={item}
                    currentCategory={currentCategory}
                    key={item}
                    updater={updateMenu}/>
        ))}
      </ul>
	  </div>
  );
};

export default Menu;