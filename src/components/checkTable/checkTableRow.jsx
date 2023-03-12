import React, { useState, useEffect, useCallback } from 'react';

export function useChecked(dispatcherToInvoke, initialValue = false) {
  const [checked, setChecked] = useState(initialValue);

  const updateCheck = useCallback(() => {
    dispatcherToInvoke({ isIncrement: !checked });
    setChecked((prevState) => !prevState);
  }, [checked, dispatcherToInvoke]);

  useEffect(() => {
    return () => {
      setChecked(false);
    };
  }, []);

  return { checked, updateCheck };
}

function CheckTableRow(props) {
  const { item, selectedCounterDispatcher, toHide = [], showProductDetails } = props;
  const { checked, updateCheck } = useChecked(selectedCounterDispatcher)

  const openDetails = () => {
    showProductDetails(item.id);
  };

  const cells = Object.entries(item)
    .filter(([key]) => !toHide.includes(key))
    .map(([, val]) => (
    <td key={`${item.id}${val}`}>{val}</td>
  ));

  useEffect(() => {
    console.log(`Checked state for item with id ${item.id} has changed to ${checked}`);
    
    return () => {
      console.log(`Unmounting CheckTableRow with id ${item.id}`);
    };
  }, [checked, item.id]);

  return (
    <tr>
      {cells}
      <td>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id={item.id + '_checkbox'}
            onChange={updateCheck}
            checked={checked}
          />
          <label htmlFor={item.id + '_checkbox'} className="check-box"></label>
        </div>
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