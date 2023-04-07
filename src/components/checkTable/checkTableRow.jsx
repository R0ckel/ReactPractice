import React, {useState, useEffect, useCallback, useContext} from 'react';
import {UserStatusContext} from "../../contexts/userStatus.context";
import {ProductListContext} from "../../contexts/productListContext";
import {Link} from "react-router-dom";

export function useChecked(selectedList, setSelectedCount, selectedCount, id) {
  const [checked, setChecked] = useState(selectedList[id]);

  const updateCheck = useCallback(() => {
    selectedList[id] = !selectedList[id];
    setSelectedCount(selectedList[id]? selectedCount + 1 : selectedCount - 1)
    setChecked((prevState) => !prevState);
  }, [id, selectedList, setSelectedCount, selectedCount]);

  useEffect(() => {
    return () => {
      setChecked(false);
    };
  }, []);

  return { checked, updateCheck };
}

const CheckTableRow = React.memo(function CheckTableRow(props) {
  const { selectedProducts, attrsToHide,
    showProductDetails, setSelectedCount, selectedCount } = useContext(ProductListContext);
  const { item } = props;
  const { checked, updateCheck } = useChecked(
    selectedProducts, setSelectedCount, selectedCount, item.id
  )

  // useEffect(() => {
  //   console.log(`Checked state for item with id ${item.id} has changed to ${checked}`);
  //
  //   return () => {
  //     console.log(`Unmounting CheckTableRow with id ${item.id}`);
  //   };
  // }, [checked, item.id]);


  const cells = Object.entries(item)
  .filter(([key]) => !attrsToHide.includes(key))
  .map(([, val]) => (
    <td key={`${item.id}${val}`}>{val}</td>
  ));

  return (
    <tr>
      {cells}
      <td>
        <UserStatusContext.Consumer>
          {(status) => {
            const handleCheck = () => {
              if (!status.isLoggedIn) {
                alert("You must be authorized to check products!");
                return;
              }
              updateCheck();
            };
            return (
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id={item.id + "_checkbox"}
                  defaultChecked={checked}
                  disabled={!status.isLoggedIn}
                />
                <label htmlFor={item.id + "_checkbox"} className="check-box"
                       onClick={handleCheck}></label>
              </div>
            );
          }}
        </UserStatusContext.Consumer>
      </td>
      <td>
        <Link to={`/products/${item.id}`}>
          <button className="btn info dynamic">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
});



export default CheckTableRow;