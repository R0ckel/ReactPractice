import React from "react";
import {useLocation} from "react-router-dom";
import {ProductListAdminView} from "./productListAdminView";


export function AdminProductsPage() {
	const location = useLocation()
	console.debug(location.pathname)

	return (
		<>
			{/*<Menu />*/}
			<ProductListAdminView/>
		</>
	);
}