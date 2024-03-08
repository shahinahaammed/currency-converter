import React from "react";
export const CurrencyRow = (props) => {
  let {
    currencyOptions,
    selectedCurrency,
    OnChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div>
      <input
        type="text"
        className="input"
        value={isNaN(amount) ? '' : amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={(e)=>OnChangeCurrency(e)}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
