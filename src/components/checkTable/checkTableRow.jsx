import React, {useState, useEffect, useCallback, useContext} from 'react';
import {UserStatusContext} from "../../contexts/userStatus.context";
import {ProductListContext} from "../../contexts/productListContext";

export function useChecked(selectedList, changeSelectedCount, id) {
  const [checked, setChecked] = useState(selectedList[id]);

  const updateCheck = useCallback(() => {
    selectedList[id] = !selectedList[id];
    changeSelectedCount(selectedList[id])
    setChecked((prevState) => !prevState);
  }, [id, selectedList, changeSelectedCount]);

  useEffect(() => {
    return () => {
      setChecked(false);
    };
  }, []);

  return { checked, updateCheck };
}

function CheckTableRow(props) {
  const { selectedProducts, attrsToHide,
    showProductDetails, changeSelectedCount } = useContext(ProductListContext);
  const { item } = props;
  const { checked, updateCheck } = useChecked(selectedProducts, changeSelectedCount, item.id)

  const openDetails = () => {
    showProductDetails(item.id);
  };

  useEffect(() => {
    console.log(`Checked state for item with id ${item.id} has changed to ${checked}`);

    return () => {
      console.log(`Unmounting CheckTableRow with id ${item.id}`);
    };
  }, [checked, item.id]);


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
        <button className="btn info dynamic" onClick={openDetails}>
          Details
        </button>
      </td>
    </tr>
  );
}

export default CheckTableRow;