import React from 'react';
import MenuItem from './menuItem';

import { useState } from 'react';
import {useParams} from "react-router-dom";

const Menu = ({ categories, contentUpdater }) => {
  const { categoryName } = useParams()
  const currentCategory = Object.values(categories).flat().find((x) => x.name === categoryName);
  const [, setChosenIndex] = useState(currentCategory?.index);

  if (currentCategory === undefined) {
    console.log("bad path...")
    return <></>
  }

  const updateKey = (item) => {
    item.id = `${item.name}_id${item.index}${item.chosen ? "T" : "F"}`;
  };

  const updateMenu = (categoryIndex) => {
    categories.forEach((item) => {
      item.chosen = item.index === categoryIndex;
      updateKey(item);
    });
    setChosenIndex(categoryIndex);
  };

  return (
    <div className="menu">
      <ul className="menuList">
        {categories.map((category) => (
          <MenuItem item={category}
                    currentCategory={currentCategory}
                    key={category.id}
                    updater={updateMenu} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;