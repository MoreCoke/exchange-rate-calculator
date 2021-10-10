import React from 'react';

import { PrimaryButton, SecondaryButton } from '../Button';
import { StyledKeyboard, StyledLeftButtonGroup, StyledRightButtonGroup } from './style';

const operators = ['÷', 'x', '-', '+', '='];

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'];

const others = ['AC', 'Swap', 'Currency'];

function OtherButtons({ onOtherPress }) {
  return (
    <div>
      {others.map((el) => (
        <SecondaryButton key={el} value={el} onClick={onOtherPress}>
          {el}
        </SecondaryButton>
      ))}
    </div>
  );
}

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
        <SecondaryButton key={el} value={el} onClick={onOperatorPress}>
          {el}
        </SecondaryButton>
      ))}
    </div>
  );
}

export default function Keyboard({ onOtherPress, onNumPress, onOperatorPress }) {
  return (
    <StyledKeyboard>
      <StyledLeftButtonGroup>
        <OtherButtons onOtherPress={onOtherPress} />
        <NumButtons onNumPress={onNumPress} />
      </StyledLeftButtonGroup>
      <StyledRightButtonGroup>
        <OperatorButtons onOperatorPress={onOperatorPress} />
      </StyledRightButtonGroup>
    </StyledKeyboard>
  );
}
