import { useState, useEffect } from 'react';

import { isNumber, isOperator, calculate } from '../utils';

export default function useKeyboard() {
  const [currentNum, setCurrentNum] = useState('');
  const [accumulation, setAccumulation] = useState('');
  const [operator, setOperator] = useState('');
  const [currentKey, setCurrentKey] = useState('');

  const onOperatorPress = (currentOperator) => {
    if (accumulation && currentNum && operator) {
      const total = calculate(accumulation, currentNum, operator);
      setOperator(currentOperator);
      setCurrentNum('');
      setAccumulation(total);
      return;
    }
    if (currentNum) {
      setOperator(currentOperator);
      !accumulation && setAccumulation(currentNum);
      setCurrentNum('');
      return;
    }
    setOperator(currentOperator);
  };

  const onEnterPress = () => {
    if (accumulation && currentNum && operator) {
      const total = calculate(accumulation, currentNum, operator);
      setOperator('');
      setCurrentNum('');
      setAccumulation(total);
      return;
    }
  };

  const reset = () => {
    setCurrentNum('');
    setAccumulation('');
    setOperator('');
  };

  const delLastStr = () => {
    const newNum = currentNum.substring(0, currentNum.length - 1);
    setCurrentNum(newNum);
  };

  const onNumPress = (num) => {
    const hasPoint = currentNum.includes('.');
    const integer = currentNum.split('.').shift();

    // handle number start with zero
    if (num === '0' || num === '00') {
      if (integer === '' || (integer === '0' && !hasPoint)) {
        setCurrentNum('0');
        return;
      }
    }

    if (num === '.') {
      if (hasPoint) return;
      if (integer === '') {
        setCurrentNum('0.');
        return;
      }
      setCurrentNum((prev) => prev + num);
      return;
    }

    if (isNumber(num)) {
      if (integer === '0' && !hasPoint) {
        setCurrentNum(num);
        return;
      }
      setCurrentNum((prev) => prev + num);
    }
  };

  const onInputChange = (e) => {
    const value = e.nativeEvent.data;
    if (isOperator(value)) {
      onOperatorPress(value);
      return;
    }
    setCurrentNum(e.target.value);
  };

  const onCurrentKeyChange = (e) => {
    setCurrentKey(e.key);
  };

  useEffect(() => {
    if (currentKey === 'Enter') {
      onEnterPress();
    }
  }, [currentKey]);

  return {
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
  };
}
