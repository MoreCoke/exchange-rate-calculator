import React, { useMemo, useState } from 'react';
import { currencies } from 'currencies.json';
import numeral from 'numeral';

import Keyboard from './components/Keyboard';
import useKeyboard from './hooks/useKeyboard';
import Input from './components/Input';
import useCurrency from './hooks/useCurrency';
import Modal from './components/Modal';

const currencyMap = new Map();
currencies.forEach((el) => {
  currencyMap.set(el.code, el);
});

function App() {
  const {
    currentNum,
    accumulation,
    operator,
    onOperatorPress,
    onNumPress,
    onInputChange,
    onCurrentKeyChange,
    reset,
    onEnterPress,
    delLastStr,
  } = useKeyboard();

  const {
    sourceCurrency,
    targetCurrency,
    sourceFXRate,
    targetFXRate,
    setSourceCurrency,
    handleTargetValue,
    handleRateSwap,
  } = useCurrency('TWD');

  const sourceValue = useMemo(() => {
    if (accumulation === '') return '';
    return numeral(accumulation).format('0,0');
  }, [accumulation]);

  const targetAccumulation = useMemo(() => {
    if (accumulation === '') return '';
    return numeral(accumulation).multiply(targetFXRate).format('0.0');
  }, [targetCurrency, targetFXRate, accumulation]);

  const targetValue = useMemo(() => {
    if (currentNum === '') return '';
    return numeral(currentNum).multiply(targetFXRate).format('0.0');
  }, [currentNum, targetFXRate]);

  const operatorValue = useMemo(() => {
    if (operator === '=') return '';
    return operator;
  }, [operator]);

  const [sourceModal, setSourceModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);

  return (
    <div style={{ marginTop: 30, textAlign: 'center' }}>
      <Modal
        show={sourceModal}
        list={currencies}
        selectedValue={sourceCurrency}
        onSelect={setSourceCurrency}
        onClose={() => setSourceModal(false)}
      />
      <Modal
        show={targetModal}
        list={currencies}
        selectedValue={targetCurrency}
        onSelect={handleTargetValue}
        onClose={() => setTargetModal(false)}
      />
      <form
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor={'monitor'}
          style={{
            flexBasis: 80,
            height: 40,
            fontSize: '1em',
            fontWeight: 'bold',
          }}
          onClick={() => setSourceModal(!sourceModal)}
        >
          {sourceCurrency} {sourceValue} {operatorValue}
        </label>
        <Input
          id={'monitor'}
          value={currentNum}
          onChange={onInputChange}
          onKeyDown={onCurrentKeyChange}
        />
      </form>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onClick={() => setTargetModal(!targetModal)}
      >
        <div style={{ flexBasis: 80, height: 40, fontSize: '1em', fontWeight: 'bold' }}>
          {targetCurrency} {targetAccumulation}
        </div>
        <div
          style={{
            flexBasis: 200,
            height: 40,
            fontSize: '1em',
            fontWeight: 'bold',
            textAlign: 'right',
          }}
        >
          {targetValue}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Keyboard
          onSwapPress={handleRateSwap}
          onClearPress={reset}
          onDelPress={delLastStr}
          onNumPress={onNumPress}
          onOperatorPress={onOperatorPress}
          onEnterPress={onEnterPress}
        />
      </div>
    </div>
  );
}

export default App;
