import { useState, useEffect } from 'react';

export default function useCurrency(currency = 'TWD') {
  const [sourceCurrency, setSourceCurrency] = useState(currency);
  const [targetCurrency, setTargetCurrency] = useState('USD');

  const [sourceFXRate, setSourceFXRate] = useState(0);
  const [targetFXRate, setTargetFXRate] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`;
        const res = await fetch(url);
        const response = await res.json();
        const { [sourceCurrency]: source, [targetCurrency]: target } = response.rates;

        setData(response.rates);
        setSourceFXRate(source);
        setTargetFXRate(target);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    fetchData();
  }, [sourceCurrency]);

  const handleRateSwap = () => {
    const source = targetCurrency;
    const target = sourceCurrency;

    setSourceCurrency(source);
    setTargetCurrency(target);
  };

  const handleTargetValue = (currency) => {
    setTargetCurrency(currency);
    setTargetFXRate(data[currency]);
  };
  return {
    sourceCurrency,
    targetCurrency,
    sourceFXRate,
    targetFXRate,
    setSourceCurrency,
    handleTargetValue,
    handleRateSwap,
  };
}
