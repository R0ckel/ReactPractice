import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../../css/app.module.css";
import checkboxStyle from "../../css/checkbox.module.css"
import {useDispatch, useSelector} from "react-redux";
import {toggleProductSelected} from "../../contexts/reduxStore";

export function useChecked(products, id, dispatch) {
	const product = products.find(product => product.id === id)
	const [checked, setChecked] = useState(product.selected ?? false);

	const updateCheck = useCallback(() => {
		setChecked((prevState) => !prevState);
		dispatch(toggleProductSelected(id))
	}, [products, id]);

	useEffect(() => {
		return () => {
			setChecked(product.selected);
		};
  }, []);

  return { checked, updateCheck };
}

const CheckTableRow = React.memo(function CheckTableRow({item}) {
	const {cardViewFields, products} = useSelector(state => state.productList)
	const dispatch = useDispatch()
	const {isLoggedIn} = useSelector(state => state.userStatus)
	const {checked, updateCheck} = useChecked(
		products, item.id, dispatch
	)

	const cells = Object.entries(item)
	.filter(([key]) => cardViewFields.includes(key))
	.map(([key, val]) => (
		<td key={`${item.id}${key}${val}`}>{val}</td>
	));

	const handleCheck = () => {
		if (!isLoggedIn) {
			alert("You must be authorized to check products!");
			return;
		}
		updateCheck();
	};

	return (
		<tr>
			{cells}
			<td>
				<div className={checkboxStyle["checkbox-wrapper"]}>
					<input
						type="checkbox"
						id={item.id + "_checkbox"}
						defaultChecked={checked}
						disabled={!isLoggedIn}
					/>
					<label htmlFor={item.id + "_checkbox"}
					       className={checkboxStyle["check-box"]}
					       onClick={handleCheck}>
					</label>
				</div>
			</td>
			<td>
				<Link to={`/products/${item.id}`}>
					<button className={`${styles.btn} ${styles.info} ${styles.dynamic}`}>
						Details
					</button>
				</Link>
			</td>
		</tr>
	);
});



export default CheckTableRow;