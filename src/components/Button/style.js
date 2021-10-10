import styled from 'styled-components';

export const DefaultButton = styled.button`
  outline: none;
  width: 70px;
  height: 70px;
  border: 0.5px solid white;
  &:hover {
    opacity: 0.7;
  }
`;

export const StyledPrimaryButton = styled(DefaultButton)`
  background: orange;
`;

export const StyledSecondaryButton = styled(DefaultButton)`
  background: gray;
`;
