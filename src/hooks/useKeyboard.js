import { useState, useEffect } from 'react';
import numeral from 'numeral';

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
    setCurrentNum((prev) => prev + num);
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
