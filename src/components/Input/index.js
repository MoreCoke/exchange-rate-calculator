import React, { useRef, useMemo, useEffect, useState } from 'react';
import numeral from 'numeral';

import { StyledInput } from './style';

export default function Input(props) {
  const [cursor, setCursor] = useState(null);
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  const inputValue = useMemo(() => {
    if (props.value === '') return '';
    return focus ? props.value : numeral(props.value).format('0,0');
  }, [props.value, focus]);

  useEffect(() => {
    const input = ref.current;
    if (input) {
      input.setSelectionRange(cursor, cursor);
    }
  }, [ref, cursor, props.value]);

  const onChange = (e) => {
    setCursor(e.target.selectionStart);
    props.onChange(e);
  };

  return (
    <StyledInput
      {...props}
      ref={ref}
      value={inputValue}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}
