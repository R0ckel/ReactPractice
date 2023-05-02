import React from 'react';
import {KeyValueTable} from '../../dataTable/keyValueTable';
import {CommentForm} from './commentForm';
import {PriceConverter} from './priceConverter';
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import styles from '../../../css/app.module.css';
import {useSelector} from "react-redux";

export default function ProductDetails () {
  const {id} = useParams()
  const location = useLocation()
  const {products} = useSelector(store => store.productList)
  const {baseUrl} = useSelector(store => store.baseAppUrl)
  console.debug(location.pathname)

  let product = products.find(x => x.id.toString() === id)
  if (product === undefined) {
    console.log(`Product not found (id = ${id})`)
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <main>
      <Link to={`${baseUrl}/${product.category}`}>
        <button className={`${styles.btn} ${styles.white}`}>
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

      <CommentForm/>
    </main>
  )
}