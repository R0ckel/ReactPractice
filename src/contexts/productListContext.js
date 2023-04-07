import React from "react";

export const ProductListContext = React.createContext({
	categoryName: "No category",
	allCategories: [],
	products: [],
	selectedProducts: [],
	attrsToHide: [],
	selectedCount: 0,
	setSelectedCount: () => {
	}
})