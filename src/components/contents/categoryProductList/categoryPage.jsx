import Menu from "../../layout/menu";
import ProductList from "./productList";
import React from "react";
import {useLocation} from "react-router-dom";


export function CategoryPage() {
	const location = useLocation()
	console.debug(location.pathname)

	return (
		<>
			<Menu/>
			<ProductList/>
		</>
	);
}