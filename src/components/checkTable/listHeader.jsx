import React from 'react';
import {ProductListContext} from "../../contexts/productListContext";

function ListHeader() {
  return (
    <ProductListContext.Consumer>
      {({categoryName, selectedCount, currentProducts})=>{
        return (
          <div className='listHeader'>
            <span className='warning'>{categoryName}</span>
            <span className='centered'>Shown: {currentProducts.length}</span>
            <span className='aright'>Selected: {selectedCount}</span>
          </div>
        )
      }}
    </ProductListContext.Consumer>
  );
}

export default ListHeader