import CheckTableRow from '../../checkTable/checkTableRow';
import ListHeader from '../../checkTable/listHeader';
import CheckTableHeader from '../../checkTable/checkTableHeader';
import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import styles from "../../../css/app.module.css";
import animatedItemStyles from '../../../css/animatedItem.module.css';
import styled from 'styled-components';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import helperStyles from '../../../css/helpers.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addProduct, getProductCategories} from "../../../contexts/reduxStore";

export default function ProductList() {
	const {categoryName} = useParams();
	const dispatch = useDispatch();
	const {products} = useSelector(state => state.productList)
	const [productsOfCategory, setProductsOfCategory] = useState(products.filter(x => x.category === categoryName));
	const allCategories = useSelector(getProductCategories);
	const {baseUrl} = useSelector(state => state.baseAppUrl)

	const handleAddProduct = () => {
		const mark = prompt('Enter the mark of the new product:');
		if (!mark) return;
		const model = prompt('Enter the model of the new product:');
		if (mark && model) {
			const newId = Math.max(...products.map((product) => product.id)) + 1;
			const newProduct = {id: newId, mark, model, category: categoryName, selected: false}
			dispatch(addProduct(newProduct))
			setProductsOfCategory(prevList => [...prevList, newProduct]);
		}
	};

	useEffect(() => {
		setProductsOfCategory(products.filter(x => x.category === categoryName));
	}, [categoryName, products]);

	if (categoryName === undefined || !allCategories.some(cat => cat === categoryName)) {
		if (allCategories.length > 0) {
			return <Navigate to={`${baseUrl}/${allCategories[0]}`}/>;
		}
		return (
			<h1>NO PRODUCTS</h1>
		)
	}

	return (
		<main>
			<ListHeader
				key={productsOfCategory[0]?.id ?? 0}
				shown={productsOfCategory.length}
				category={categoryName}
			/>
			<table className={styles.smoothTable}>
				<CheckTableHeader template={productsOfCategory[0]}/>
				<TransitionGroup component="tbody">
					{productsOfCategory.map(item => (
						<CSSTransition key={item.id} timeout={500} classNames={{
							enter: animatedItemStyles["item-enter"],
							enterActive: animatedItemStyles["item-enter-active"],
							exit: animatedItemStyles["item-exit"],
							exitActive: animatedItemStyles["item-exit-active"]
						}}>
							<CheckTableRow
								item={item}
								key={item.id.toString()}
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