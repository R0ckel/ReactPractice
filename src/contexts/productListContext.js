import React from "react";

export const ProductListContext = React.createContext({
	categoryName: "No category",
	allCategories: [],
	products: [],
	setProducts: (products) => {
		this.products = products
	},
	selectedProducts: [],
	// attrsToHide: [],
	cardViewFields: [],
	selectedCount: 0,
	setSelectedCount: () => {
	}
})