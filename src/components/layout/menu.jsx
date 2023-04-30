import React, {useContext, useState} from 'react';
import MenuItem from './menuItem';
import {useParams} from "react-router-dom";
import styles from '../../css/app.module.css'
import {MenuItemsContext} from "../../contexts/menuItemsContext";

const Menu = () => {
  const {categoryName} = useParams()
  const {items} = useContext(MenuItemsContext)
  const currentCategory = Object.values(items).flat().find((x) => x.name === categoryName);
  const [, setChosenIndex] = useState(currentCategory?.index);

  if (currentCategory === undefined) {
    console.log("bad path...")
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
    setChosenIndex(categoryIndex);
  };

  return (
	  <div className={styles.menu}>
      <ul className={styles.menuList}>
        {items.map((item) => (
          <MenuItem item={item}
                    currentCategory={currentCategory}
                    key={item.key}
                    updater={updateMenu}/>
        ))}
      </ul>
	  </div>
  );
};

export default Menu;