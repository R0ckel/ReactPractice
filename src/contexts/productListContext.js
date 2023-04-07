import React from "react";

export const ProductListContext = React.createContext({
	categoryName: "No category",
	currentProducts: [],
	selectedProducts: [],
	attrsToHide: [],
	selectedCount: 0,
	changeSelectedCount: (increment) => {},
	showProductList: (category) => {},
	showProductDetails: (id) => {}
})