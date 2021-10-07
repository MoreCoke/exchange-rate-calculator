import styled from 'styled-components';

export const DefaultButton = styled.button`
  outline: none;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  border: 0px;
`;

export const StyledPrimaryButton = styled(DefaultButton)`
  background: orange;
`;

export const StyledSecondaryButton = styled(DefaultButton)`
  background: gray;
`;
