import React from 'react';
import {ProductListContext} from "../../contexts/productListContext";

function ListHeader(props) {
  const { shown, category } = props;

  return (
    <ProductListContext.Consumer>
      {({selectedCount})=>{
        return (
          <div className='listHeader'>
            <span className='warning'>{category}</span>
            <span className='centered'>Shown: {shown}</span>
            <span className='aright'>Selected: {selectedCount}</span>
          </div>
        )
      }}
    </ProductListContext.Consumer>
  );
}

export default ListHeader