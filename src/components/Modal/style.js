import styled, { css } from 'styled-components';

export const StyledMask = styled.div`
  background: black;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.6;
`;

export const StyledModal = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 2;
  margin: auto;
  background: white;
  width: 400px;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 40px;
  font-size: 1.25em;
  margin-bottom: 8px;
`;

export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  height: calc(100% - 50px);

  &&::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    border: 4px solid transparent;
  }

  &&::-webkit-scrollbar {
    width: 8px;
    background-color: black;
    border-radius: 8px;
    border: 4px solid transparent;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 8px;
    border: 4px solid transparent;
  }
`;

export const StyledListItem = styled.li`
  font-size: 1em;
  padding: 4px;
  text-align: left;
  position: relative;

  &&:before {
    content: '';
    height: 1px;
    background: black;
    width: 95%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      &&:after {
        content: '✔';
        margin-left: 30px;
        color: orange;
      }
    `}
`;
