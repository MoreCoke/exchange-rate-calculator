import React, { useState, useEffect, useMemo } from 'react';
import numeral from 'numeral';

import { PrimaryButton, SecondaryButton } from './components/Button';

const operators = ['÷', 'x', '-', '+', '='];

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'];

const others = ['AC', 'Swap', 'Currency'];

function App() {
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

  const inputValue = useMemo(() => currentNum || accumulation, [currentNum, accumulation]);

  return (
    <div style={{ marginTop: 30 }}>
      <h1 style={{ textAlign: 'center', height: 40 }}>{inputValue}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ flexBasis: 210, alignSelf: 'flex-end' }}>
          <div>
            {others.map((el) => (
              <SecondaryButton key={el} value={el} onClick={onOtherPress}>
                {el}
              </SecondaryButton>
            ))}
          </div>
          <div>
            {numbers.map((el) => (
              <PrimaryButton key={el} value={el} onClick={onNumPress}>
                {el}
              </PrimaryButton>
            ))}
          </div>
        </div>
        <div style={{ flexBasis: 70 }}>
          {operators.map((el) => (
            <SecondaryButton key={el} value={el} onClick={onOperatorPress}>
              {el}
            </SecondaryButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
