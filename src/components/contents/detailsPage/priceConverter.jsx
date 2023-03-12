import React, { useState } from 'react';
import { PriceInput } from './priceInput';

export const currencyNames = {
  USD: 'dollars ($)',
  UAH: 'hryvnias (UAH)'
}

function tryConvertCurrency(price, convert){
  const input = parseFloat(price);
  if (Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const rate = 36.76;

function toUAH(USD){
  return USD * rate;
}

function toUSD(UAH){
  return UAH / rate;
}

function usePriceValue(initialPrice, initialCurrency){
  const [price, setPrice] = useState(initialPrice);
  const [currency, setCurrency] = useState(initialCurrency);

  function handleChange(price, currency){
    setPrice(price)
    setCurrency(currency)
  }

  return {price, currency, handleChange};
}

export function PriceConverter(props){
  const { price, currency, handleChange } = usePriceValue(props.price, 'USD')
  let UAH = currency === 'USD' ? tryConvertCurrency(price, toUAH) : price;
  let USD = currency === 'UAH' ? tryConvertCurrency(price, toUSD) : price;
  
  return(
    <div>
      <PriceInput 
        currency="USD"
        price={USD}
        onPriceChange={handleChange}/>
      <PriceInput 
        currency="UAH"
        price={UAH}
        onPriceChange={handleChange}/>
    </div>
  )
}