import Menu from "../../layout/menu";
import ProductList from "./productList";
import React from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getProductCategories} from "../../../contexts/reduxStore";

export function ProductsPage() {
	const location = useLocation()
	console.debug(location.pathname)
	const productCategories = useSelector(getProductCategories);

	return (
		<>
			<Menu items={productCategories}/>
			<ProductList/>
		</>
	);
}