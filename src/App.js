import React, { useState, useEffect } from 'react';
import numeral from 'numeral';

import { PrimaryButton, SecondaryButton } from './components/Button';

const operators = ['÷', 'x', '-', '+', '='];

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'];

const others = ['AC', 'Swap', 'Currency'];

function App() {
  const [currentNum, setCurrentNum] = useState('');
  const [calculation, setCalculation] = useState([]);

  useEffect(() => {
    if (calculation.length < 3) return;
    console.log('from useEffect!!');
    calculate();
  }, [calculation]);

  // useEffect(() => {
  //   console.log('calculation: ', calculation);
  //   console.log('currentNum: ', currentNum);
  // }, [calculation, currentNum]);

  const onOperatorPress = (operator) => {
    switch (operator) {
      case '-':
      case 'x':
      case '+':
      case '÷':
        if (calculation.length < 3) {
          setCalculation((prev) => [...prev, currentNum, operator]);
          setCurrentNum('');
        }
        break;
      case '=':
        if (calculation.length < 3) {
          setCalculation((prev) => [...prev, currentNum]);
          setCurrentNum('');
        }
        break;
    }
  };

  const onOtherPress = (other) => {
    switch (other) {
      case 'AC':
        setCurrentNum('');
        setCalculation([]);
        break;
      case 'Swap':
        //TODO
        break;
      case 'Currency':
      //TODO
    }
  };

  const calculate = () => {
    const [num1, operator, num2] = calculation;
    console.log('num1: ', num1);
    console.log('num2: ', num2);
    console.log('operator: ', operator);
    let total = '0';
    switch (operator) {
      case '-':
        total = numeral(num1).subtract(num2)._value;
        setCurrentNum(total);
        setCalculation([]);
        break;
      case 'x':
        total = numeral(num1).multiply(num2)._value;
        setCurrentNum(total);
        setCalculation([]);
        break;
      case '+':
        total = numeral(num1).add(num2)._value;
        setCurrentNum(total);
        setCalculation([]);
        break;
      case '÷':
        total = numeral(num1).divide(num2)._value;
        setCurrentNum(total);
        setCalculation([]);
        break;
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h1 style={{ textAlign: 'center', height: 40 }}>{currentNum}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ flexBasis: 180, alignSelf: 'flex-end' }}>
          <div>
            {others.map((el) => (
              <SecondaryButton
                key={el}
                onClick={() => {
                  onOtherPress(el);
                }}
              >
                {el}
              </SecondaryButton>
            ))}
          </div>
          <div>
            {numbers.map((el) => (
              <PrimaryButton
                key={el}
                onClick={() => {
                  setCurrentNum((prev) => prev + el);
                }}
              >
                {el}
              </PrimaryButton>
            ))}
          </div>
        </div>
        <div style={{ flexBasis: 60 }}>
          {operators.map((el) => (
            <SecondaryButton
              key={el}
              onClick={() => {
                onOperatorPress(el);
              }}
            >
              {el}
            </SecondaryButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
