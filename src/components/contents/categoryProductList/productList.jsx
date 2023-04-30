import CheckTableRow from '../../checkTable/checkTableRow';
import ListHeader from '../../checkTable/listHeader';
import CheckTableHeader from '../../checkTable/checkTableHeader';
import React, {useContext, useEffect, useState} from 'react';
import {ProductListContext} from "../../../contexts/productListContext";
import {Navigate, useLocation, useParams} from "react-router-dom";
import styles from "../../../css/app.module.css";
import animatedItemStyles from '../../../css/animatedItem.module.css';
import styled from 'styled-components';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import helperStyles from '../../../css/helpers.module.css';

export default function ProductList() {
	const {categoryName} = useParams();
	const location = useLocation();
	const {products, selectedProducts, allCategories} = useContext(ProductListContext);
	const [productList, setProductList] = useState(products.filter(x => x.category === categoryName));

	const handleAddProduct = () => {
		const mark = prompt('Enter the mark of the new product:');
		if (!mark) return;
		const model = prompt('Enter the model of the new product:');
		if (mark && model) {
			const newId = products.length + 1;
			const newProduct = {id: newId, mark, model, category: categoryName}
			products.push(newProduct);
			setProductList(prevList => [...prevList, newProduct]);

			selectedProducts[newId] = false;
		}
	};

	useEffect(() => {
		setProductList(products.filter(x => x.category === categoryName));
	}, [categoryName, products]);

	if (categoryName === undefined || !allCategories.some(cat => cat.name === categoryName)) {
		console.log(location);
		return <Navigate to={`/categories/${allCategories[0].name}`}/>;
	}

	return (
		<main>
			<ListHeader
				key={productList[0]?.id ?? 0}
				shown={productList.length}
				category={categoryName}
			/>
			<table className={styles.smoothTable}>
				<CheckTableHeader template={productList[0]}/>
				<TransitionGroup component="tbody">
					{productList.map(item => (
						<CSSTransition key={item.id} timeout={500} classNames={{
							enter: animatedItemStyles["item-enter"],
							enterActive: animatedItemStyles["item-enter-active"],
							exit: animatedItemStyles["item-exit"],
							exitActive: animatedItemStyles["item-exit-active"]
						}}>
							<CheckTableRow
								item={item}
								key={item.id.toString().concat(selectedProducts[item.id])}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</table>

			<div className={helperStyles["center-wrapper"]}>
				<AddButton onClick={handleAddProduct}>Add Product</AddButton>
			</div>
		</main>
	);
}

const AddButton = styled.button`
  background-color: #3c8c40;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 1vh;

  &:hover {
    background-color: #2e8a31;
    cursor: pointer;
  }

  &:active {
    background-color: #044408;
  }
`