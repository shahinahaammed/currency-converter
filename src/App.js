import { useEffect, useState } from "react";
import "./App.css";
import { CurrencyRow } from "./components/CurrencyRow";

const BASE_URL =
  "https://v6.exchangerate-api.com/v6/daf4cc0bc8ef2f0e8d82d8e0/latest/USD";
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountFromCurrency] = useState(true);
  console.log("excha", exchangeRate);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.conversion_rates)[0];
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]); 
      });
  }, []);
  // console.log(BASE_URL);
  // console.log(currencyOptions);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  };

  return (
    <div>
      <h1>Currency</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        OnChangeCurrency={(e) => setFromCurrency(e.traget.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        OnChangeCurrency={(e) => setToCurrency(e.traget.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
