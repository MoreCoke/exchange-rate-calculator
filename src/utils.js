import numeral from 'numeral';

const numberRegex = /[0-9]/;

export const isNumber = (s) => {
  return numberRegex.test(s);
};

const validNumberRegex = /^-?(0|[1-9]\d*)(\.\d+)?$/;

export const isValidNumber = (s) => {
  return validNumberRegex.test(s);
};

const operators = [
  { label: '÷', value: '/' },
  { label: 'x', value: '*' },
  { label: '-', value: '-' },
  { label: '+', value: '+' },
];

export const isOperator = (s) => {
  return operators.some((el) => el.value === s);
};

const alphabetRegex = /^[a-z|A-Z]$/;

export const isAlphabet = (s) => {
  return alphabetRegex.test(s);
};

export const calculate = (accumulation, current, operator) => {
  let total = '0';
  switch (operator) {
    case '-':
      total = numeral(accumulation).subtract(current)._value + '';
      break;
    case '*':
      total = numeral(accumulation).multiply(current)._value + '';
      break;
    case '+':
      total = numeral(accumulation).add(current)._value + '';
      break;
    case '/':
      total = numeral(accumulation).divide(current)._value + '';
      break;
    default:
      break;
  }

  return total;
};

export const numberWithCommas = (num) => {
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
