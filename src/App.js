import React, { useMemo, useState, useEffect, useRef } from 'react';

import Keyboard from './components/Keyboard';
import useKeyboard from './hooks/useKeyboard';

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

  const inputValue = useMemo(() => currentNum || accumulation, [currentNum, accumulation]);
  const [cursor, setCursor] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, inputValue]);

  return (
    <div style={{ marginTop: 30, textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center', height: 40 }}>{inputValue}</h1>
      <input
        style={{ textAlign: 'right', marginBottom: 20 }}
        ref={ref}
        value={inputValue}
        onChange={(e) => {
          setCursor(e.target.selectionStart);
          onInputChange(e.nativeEvent.data, e.target.selectionStart);
          // console.log(e.nativeEvent.data);
        }}
        onKeyDown={(e) => {
          onCurrentKeyChange(e.key);
          // console.log('onKeyDown', e.key);
        }}
      />
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
