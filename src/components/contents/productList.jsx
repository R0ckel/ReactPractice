import CheckTableRow from '../checkTable/checkTableRow';
import ListHeader from '../checkTable/listHeader';
import CheckTableHeader from '../checkTable/checkTableHeader';
import React from 'react';
import '../../css/checkbox.css'
import {ProductListContext} from "../../contexts/productListContext";

const ProductList = React.memo((props) => {
  // const updateSelectedCounter = (state, action) => {
	// 	return {selected: state.selected + (action.isIncrement ? 1 : -1)}
  // }
  // const [state, dispatch] = useReducer(updateSelectedCounter, {selected: 0});

  // useEffect(() => {
  //   console.log(`Checked state for items`);
  //
  //   return () => {
  //     console.log(`Unmounting CheckTable`);
  //   };
  // });

  return (
    <ProductListContext.Consumer>
      {({currentProducts, selectedProducts})=>{
        return (
          <main>
            <ListHeader
              key={currentProducts[0]?.id ?? 0}
            />
            <table className='smoothTable'>
              <CheckTableHeader />
              <tbody>
                {currentProducts.map(item => (
                  <CheckTableRow
                    item={item}
                    key={item.id.toString().concat(selectedProducts[item.id])}
                  />
                ))}
              </tbody>
            </table>
          </main>
        )
      }}
    </ProductListContext.Consumer>
  );
})

export default ProductList