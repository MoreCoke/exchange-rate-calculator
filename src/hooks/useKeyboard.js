import { useState, useEffect } from 'react';
import numeral from 'numeral';

const numberRegex = /[0-9]/;
const isNumber = (s) => {
  return numberRegex.test(s);
};

export default function useKeyboard() {
  const [currentNum, setCurrentNum] = useState('');
  const [accumulation, setAccumulation] = useState('');
  const [operator, setOperator] = useState('');

  useEffect(() => {
    console.log('currentNum: ', currentNum);
    console.log('accumulation: ', accumulation);
    console.log('operator: ', operator);
  }, [currentNum, accumulation, operator]);

  const onOperatorPress = (currentOperator) => {
    switch (currentOperator) {
      case '-':
      case 'x':
      case '+':
      case '÷':
        if (accumulation && currentNum && operator) {
          calculate();
          setOperator(currentOperator);
          return;
        }
        if (currentNum) {
          setOperator(currentOperator);
          !accumulation && setAccumulation(currentNum);
          setCurrentNum('');
          return;
        }
        setOperator(currentOperator);
        break;
      case '=':
        if (accumulation && currentNum && operator) {
          calculate();
          return;
        }
        break;
      default:
        break;
    }
  };

  const onOtherPress = (other) => {
    switch (other) {
      case 'AC':
        setCurrentNum('');
        setAccumulation('');
        setOperator('');
        break;
      case 'Swap':
        //TODO
        break;
      case 'Currency':
        //TODO
        break;
      default:
        break;
    }
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

  const calculate = () => {
    let total = '0';
    switch (operator) {
      case '-':
        total = numeral(accumulation).subtract(currentNum)._value + '';
        break;
      case 'x':
        total = numeral(accumulation).multiply(currentNum)._value + '';
        break;
      case '+':
        total = numeral(accumulation).add(currentNum)._value + '';
        break;
      case '÷':
        total = numeral(accumulation).divide(currentNum)._value + '';
        break;
      default:
        break;
    }
    setCurrentNum('');
    setAccumulation(total);
    setOperator('');
  };

  return {
    currentNum,
    accumulation,
    onOperatorPress,
    onNumPress,
    onOtherPress,
  };
}
