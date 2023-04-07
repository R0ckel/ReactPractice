import React from 'react';
import { KeyValueTable } from '../../dataTable/keyValueTable';
import { CommentForm } from './commentForm';
import { PriceConverter } from './priceConverter';
import {ProductListContext} from "../../../contexts/productListContext";

export class ProductDetails extends React.Component{
  render(){
    return(
      <ProductListContext.Consumer>
        {({currentProducts, showProductList, categoryName})=>{
          return (
            <main>
              <button
                className='btn white'
                onClick={()=>showProductList(categoryName)}>
                &larr; Back to category
              </button>

              <h1>{currentProducts[0].mark} {currentProducts[0].model}</h1>
              <h3>Details:</h3>
              <KeyValueTable
                item={currentProducts[0]}
              />

              <h2>PriceConverter</h2>
              <PriceConverter price={currentProducts[0].price}/>

              <br/>
              <CommentForm/>
            </main>
          )
        }}
      </ProductListContext.Consumer>
    )
  }
}