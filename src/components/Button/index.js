import React from 'react';
import { StyledPrimaryButton, StyledSecondaryButton } from './style';

export function PrimaryButton({ onClick, value, children }) {
  return (
    <StyledPrimaryButton value={value} onClick={() => onClick(value)}>
      {children}
    </StyledPrimaryButton>
  );
}

export function SecondaryButton({ onClick, value, children }) {
  return (
    <StyledSecondaryButton value={value} onClick={() => onClick(value)}>
      {children}
    </StyledSecondaryButton>
  );
}
