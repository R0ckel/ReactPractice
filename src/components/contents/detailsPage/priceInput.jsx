import React from 'react';
import { currencyNames } from './priceConverter';

export function PriceInput(props){
  function handleChange(event){
    props.onPriceChange(event.target.value, currency)
  }

  const price = props.price;
  const currency = props.currency;
  
  return (
    <fieldset>
      <legend>Enter price in {currencyNames[currency]}</legend>
      <input type="number" value={price}
              onChange={handleChange} />
    </fieldset>
  )
}