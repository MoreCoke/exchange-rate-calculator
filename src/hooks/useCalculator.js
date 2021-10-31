import { useState } from 'react';

import { isNumber, isOperator, calculate as calc } from '../utils';

export default function useCalculator() {
  const [currentNum, setCurrentNum] = useState('');
  const [accumulation, setAccumulation] = useState('');
  const [operator, setOperator] = useState('');

  const calculate = (currentOperator) => {
    if (accumulation && currentNum && operator) {
      const total = calc(accumulation, currentNum, operator);
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

  const enter = () => {
    if (accumulation && currentNum && operator) {
      const total = calc(accumulation, currentNum, operator);
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

  const removeLastChar = () => {
    const newNum = currentNum.substring(0, currentNum.length - 1);
    setCurrentNum(newNum);
  };

  const updateNumber = (num) => {
    if (currentNum.length > 15) return;
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
    if (currentNum.length > 15) return;
    const value = e.nativeEvent.data;
    if (isOperator(value)) {
      calculate(value);
      return;
    }
    setCurrentNum(e.target.value);
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      enter();
    }
  };

  return {
    currentNum,
    accumulation,
    operator,
    calculate,
    updateNumber,
    onInputChange,
    onInputKeyDown,
    reset,
    enter,
    removeLastChar,
  };
}
