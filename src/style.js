import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
`;

export const StyledCalculator = styled.div`
  flex-basis: 280px;
`;

export const StyledRow = styled.div`
  display: flex;
`;

export const StyledLabel = styled.div`
  flex-basis: 80px;
  height: 40px;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledValue = styled.div`
  flex: 1;
  height: 40px;
  font-size: 1em;
  font-weight: bold;
  text-align: right;
`;

export const StyledTotalLabel = styled(StyledLabel)`
  flex-basis: 130px;
  &:hover {
    cursor: auto;
  }
`;
