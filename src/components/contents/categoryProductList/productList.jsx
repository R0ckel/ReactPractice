import CheckTableRow from '../../checkTable/checkTableRow';
import ListHeader from '../../checkTable/listHeader';
import CheckTableHeader from '../../checkTable/checkTableHeader';
import React, {useContext} from 'react';
import '../../../css/checkbox.css'
import {ProductListContext} from "../../../contexts/productListContext";
import {Navigate, useLocation, useParams} from "react-router-dom";

export default function ProductList() {
  const { categoryName } = useParams()
  const location = useLocation()
  const { products, selectedProducts, allCategories } = useContext(ProductListContext)

  if (categoryName === undefined || !allCategories.some(cat => cat.name === categoryName)){
    console.log(location)
    return <Navigate to={`/categories/${allCategories[0].name}`} />
  }

  let productList = products.filter(x => x.category === categoryName);

  return (
    <main>
      <ListHeader
        key={productList[0]?.id ?? 0}
        shown={productList.length}
        category={categoryName}
      />
      <table className='smoothTable'>
        <CheckTableHeader template={productList[0]}/>
        <tbody>
          {productList.map(item => (
            <CheckTableRow
              item={item}
              key={item.id.toString().concat(selectedProducts[item.id])}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}