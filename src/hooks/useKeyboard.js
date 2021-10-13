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
  const [currentKey, setCurrentKey] = useState('');

  // useEffect(() => {
  //   console.log('currentNum: ', currentNum);
  //   console.log('accumulation: ', accumulation);
  //   console.log('operator: ', operator);
  // }, [currentNum, accumulation, operator]);

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

  const onInputChange = (value, caretStart) => {
    const hasPoint = currentNum.includes('.');
    const integer = currentNum.split('.').shift();

    // handle number start with zero
    if (value === '0' || value === '00') {
      if (integer === '' || (integer === '0' && !hasPoint)) {
        setCurrentNum('0');
        return;
      }
    }

    if (value === '.') {
      if (hasPoint) return;
      if (integer === '') {
        setCurrentNum('0.');
        return;
      }
      if (caretStart !== undefined) {
        setCurrentNum((prev) => {
          const strArr = prev.split('').filter((e) => e);
          strArr.splice(caretStart - 1, 0, value);
          return strArr.join('');
        });
      } else {
        setCurrentNum((prev) => prev + value);
      }
      return;
    }

    if (isNumber(value)) {
      if (integer === '0' && !hasPoint) {
        setCurrentNum(value);
        return;
      }
      if (caretStart !== undefined) {
        setCurrentNum((prev) => {
          const strArr = prev.split('').filter((e) => e);
          strArr.splice(caretStart - 1, 0, value);
          return strArr.join('');
        });
      } else {
        setCurrentNum((prev) => prev + value);
      }
      return;
    }

    if (value === null) {
      if (caretStart !== undefined) {
        setCurrentNum((prev) => {
          const strArr = prev.split('').filter((e) => e);
          strArr.splice(caretStart, 1);
          return strArr.join('');
        });
      }
      return;
    }

    handleInputOperatorChange(value);
  };

  const onCurrentKeyChange = (e) => {
    setCurrentKey(e);
  };

  useEffect(() => {
    if (currentKey === 'Enter') {
      onOperatorPress('=');
    }
  }, [currentKey]);

  const handleInputOperatorChange = (value) => {
    switch (value) {
      case '+':
      case '-':
      case '=':
        onOperatorPress(value);
        break;
      case '*':
        onOperatorPress('x');
        break;
      case '/':
        onOperatorPress('÷');
        break;
      default:
        break;
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
    onInputChange,
    onCurrentKeyChange,
  };
}
