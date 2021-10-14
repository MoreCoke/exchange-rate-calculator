import React, { useMemo } from 'react';

import Keyboard from './components/Keyboard';
import useKeyboard from './hooks/useKeyboard';
import Input from './components/Input';
import numeral from 'numeral';

function App() {
  const {
    currentNum,
    accumulation,
    onOperatorPress,
    onNumPress,
    onOtherPress,
    onInputChange,
    onCurrentKeyChange,
  } = useKeyboard();

  const labelValue = useMemo(() => {
    if (accumulation === '') return '';
    return numeral(accumulation).format('0,0');
  }, [accumulation]);

  return (
    <div style={{ marginTop: 30, textAlign: 'center' }}>
      <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label
          htmlFor={'monitor'}
          style={{
            flexBasis: 80,
            height: 40,
            fontSize: '1em',
            fontWeight: 'bold',
          }}
        >
          USD$ {labelValue} operator
        </label>
        <Input
          id={'monitor'}
          value={currentNum}
          onChange={onInputChange}
          onKeyDown={onCurrentKeyChange}
        />
      </form>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Keyboard
          onOtherPress={onOtherPress}
          onNumPress={onNumPress}
          onOperatorPress={onOperatorPress}
        />
      </div>
    </div>
  );
}

export default App;
