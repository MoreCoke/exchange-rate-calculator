import React, { useMemo } from 'react';

import Keyboard from './components/Keyboard';
import useKeyboard from './hooks/useKeyboard';

function App() {
  const { currentNum, accumulation, onOperatorPress, onNumPress, onOtherPress } = useKeyboard();

  const inputValue = useMemo(() => currentNum || accumulation, [currentNum, accumulation]);

  return (
    <div style={{ marginTop: 30 }}>
      <h1 style={{ textAlign: 'center', height: 40 }}>{inputValue}</h1>
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
