import CheckTableRow from '../checkTable/checkTableRow';
import ListHeader from '../checkTable/listHeader';
import CheckTableHeader from '../checkTable/checkTableHeader';
import React, { useEffect, useReducer } from 'react';
import '../../css/checkbox.css'

const ProductList = React.memo((props) => {
  const { items, showProductDetails } = props;
  const toHide = ["category", "price", "id"];

  const updateSelectedCounter = (state, action) => {
		return {selected: state.selected + (action.isIncrement ? 1 : -1)}
  }
  const [state, dispatch] = useReducer(updateSelectedCounter, {selected: 0});

  useEffect(() => {
    console.log(`Checked state for items`);
    
    return () => {
      console.log(`Unmounting CheckTable`);
    };
  });

  return (
    <main>
      <ListHeader
        name={items[0].category}
        shown={items.length}
        selected={state.selected}
        key={items[0].category + state.selected}
      />
      <table className='smoothTable'>
        <CheckTableHeader item={items[0]} toHide={toHide} />
        <tbody>
          {items.map(item => (
            <CheckTableRow
              item={item}
              key={item.id}
              selectedCounterDispatcher={dispatch}
              showProductDetails={showProductDetails}
              toHide={toHide}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}, (prevProps, nextProps) => {
  return prevProps.items !== nextProps.items && 
  prevProps.showProductDetails !== nextProps.showProductDetails;
})

export default ProductList