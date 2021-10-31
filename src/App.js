import React, { useMemo, useState } from 'react';
import { currencies } from 'currencies.json';
import numeral from 'numeral';

import Keyboard from './components/Keyboard';
import useCalculator from './hooks/useCalculator';
import Input from './components/Input';
import useCurrency from './hooks/useCurrency';
import Modal from './components/Modal';
import {
  StyledContainer,
  StyledRow,
  StyledLabel,
  StyledValue,
  StyledCalculator,
  StyledTotalLabel,
} from './style';

function App() {
  const {
    currentNum,
    accumulation,
    calculate,
    updateNumber,
    onInputChange,
    onInputKeyDown,
    reset,
    enter,
    removeLastChar,
  } = useCalculator();

  const {
    sourceCurrency,
    targetCurrency,
    targetFXRate,
    updateSourceCurrency,
    updateTargetCurrency,
    swapCurrency,
  } = useCurrency('TWD');

  const sourceAccumulation = useMemo(() => {
    if (accumulation === '') return '';
    return numeral(accumulation).format('0,0');
  }, [accumulation]);

  const targetAccumulation = useMemo(() => {
    if (accumulation === '') return '';
    return numeral(accumulation).multiply(targetFXRate).format('0.0');
  }, [targetFXRate, accumulation]);

  const targetValue = useMemo(() => {
    if (currentNum === '') return '';
    return numeral(currentNum).multiply(targetFXRate).format('0.0');
  }, [currentNum, targetFXRate]);

  const [sourceModal, setSourceModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);

  return (
    <StyledContainer>
      <Modal
        show={sourceModal}
        list={currencies}
        selectedValue={sourceCurrency}
        onSelect={updateSourceCurrency}
        onClose={() => setSourceModal(false)}
      />
      <Modal
        show={targetModal}
        list={currencies}
        selectedValue={targetCurrency}
        onSelect={updateTargetCurrency}
        onClose={() => setTargetModal(false)}
      />
      <StyledCalculator>
        <StyledRow>
          <StyledTotalLabel>Total {sourceCurrency}: </StyledTotalLabel>
          <StyledValue>{sourceAccumulation}</StyledValue>
        </StyledRow>
        <StyledRow>
          <StyledTotalLabel>Total {targetCurrency}: </StyledTotalLabel>
          <StyledValue> {targetAccumulation}</StyledValue>
        </StyledRow>
        <StyledRow>
          <StyledLabel onClick={() => setSourceModal(!sourceModal)}>{sourceCurrency}</StyledLabel>
          <Input
            id={'monitor'}
            value={currentNum}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
          />
        </StyledRow>
        <StyledRow>
          <StyledLabel onClick={() => setTargetModal(!targetModal)}>{targetCurrency}</StyledLabel>
          <StyledValue>{targetValue}</StyledValue>
        </StyledRow>
        <Keyboard
          onSwapPress={swapCurrency}
          onClearPress={reset}
          onDelPress={removeLastChar}
          onNumPress={updateNumber}
          onOperatorPress={calculate}
          onEnterPress={enter}
        />
      </StyledCalculator>
    </StyledContainer>
  );
}

export default App;
