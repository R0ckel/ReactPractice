import React, {useContext} from 'react';
import {KeyValueTable} from '../../dataTable/keyValueTable';
import {CommentForm} from './commentForm';
import {PriceConverter} from './priceConverter';
import {ProductListContext} from "../../../contexts/productListContext";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";

export default function ProductDetails () {
  const {id} = useParams()
  const location = useLocation()
  const {products} = useContext(ProductListContext)

  console.debug(location.pathname)

  let product = products.find(x => x.id.toString() === id)
  if (product === undefined) {
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <main>
      <Link to={`/categories/${product.category}`}>
        <button className='btn white'>
          &larr; Back to category
        </button>
      </Link>

      <h1>{product.mark} {product.model}</h1>
      <h3>Details:</h3>
      <KeyValueTable
        item={product}
      />

      <h2>PriceConverter</h2>
      <PriceConverter price={product.price}/>

      <br/>
      <CommentForm/>
    </main>
  )
}