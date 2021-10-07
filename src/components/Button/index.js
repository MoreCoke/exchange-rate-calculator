import React from 'react';
import { StyledPrimaryButton, StyledSecondaryButton } from './style';

export function PrimaryButton({ onClick, children }) {
  return <StyledPrimaryButton onClick={onClick}>{children}</StyledPrimaryButton>;
}

export function SecondaryButton({ onClick, children }) {
  return <StyledSecondaryButton onClick={onClick}>{children}</StyledSecondaryButton>;
}
