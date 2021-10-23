import React from 'react';

import { PrimaryButton, SecondaryButton } from '../Button';
import { StyledKeyboard, StyledLeftButtonGroup, StyledRightButtonGroup } from './style';

const operators = [
  { label: '÷', value: '/' },
  { label: 'x', value: '*' },
  { label: '-', value: '-' },
  { label: '+', value: '+' },
];

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'];

function NumButtons({ onNumPress }) {
  return (
    <div>
      {numbers.map((el) => (
        <PrimaryButton key={el} value={el} onClick={onNumPress}>
          {el}
        </PrimaryButton>
      ))}
    </div>
  );
}

function OperatorButtons({ onOperatorPress }) {
  return (
    <div>
      {operators.map((el) => (
        <SecondaryButton key={el.label} value={el.value} onClick={onOperatorPress}>
          {el.label}
        </SecondaryButton>
      ))}
    </div>
  );
}

function EnterButton({ onEnterPress }) {
  return (
    <div>
      <SecondaryButton value={'='} onClick={onEnterPress}>
        =
      </SecondaryButton>
    </div>
  );
}

export default function Keyboard({
  onClearPress,
  onSwapPress,
  onDelPress,
  onNumPress,
  onOperatorPress,
  onEnterPress,
}) {
  return (
    <StyledKeyboard>
      <StyledLeftButtonGroup>
        <div>
          <SecondaryButton onClick={onClearPress}>AC</SecondaryButton>
          <SecondaryButton onClick={onDelPress}>←</SecondaryButton>
          <SecondaryButton onClick={onSwapPress}>Swap</SecondaryButton>
        </div>
        <NumButtons onNumPress={onNumPress} />
      </StyledLeftButtonGroup>
      <StyledRightButtonGroup>
        <OperatorButtons onOperatorPress={onOperatorPress} />
        <EnterButton onEnterPress={onEnterPress} />
      </StyledRightButtonGroup>
    </StyledKeyboard>
  );
}
