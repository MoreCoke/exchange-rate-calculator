import React, { useRef, useMemo, useState } from 'react';
import numeral from 'numeral';

import { StyledInput } from './style';
import { isNumber, isAlphabet, isValidNumber } from '../../utils';

export default function Input(props) {
  const [oldValue, setOldValue] = useState('');
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  const inputValue = useMemo(() => {
    if (props.value === '') return '';
    return focus ? props.value : numeral(props.value).format('0,0');
  }, [props.value, focus]);

  const onKeyDown = (e) => {
    if (isAlphabet(e.key)) {
      e.preventDefault();
    }
    props.onKeyDown(e);
  };

  const onChange = (e) => {
    const value = e.nativeEvent.data;
    const newValue = e.target.value;
    const hasPoint = oldValue.includes('.');
    const integer = oldValue.split('.').shift();

    if (value === '.') {
      if (hasPoint) return;
      if (integer === '') {
        e.target.value = '0.';
        props.onChange(e);
        setOldValue('0.');
        return;
      }
      props.onChange(e);
      setOldValue(newValue);
    }

    if (isNumber(value)) {
      if (integer === '0' && !hasPoint) {
        e.target.value = value;
        props.onChange(e);
        setOldValue(value);
        return;
      }

      if (!isValidNumber(newValue)) {
        return;
      }
      props.onChange(e);
      setOldValue(newValue);
      return;
    }

    props.onChange(e);
    setOldValue(newValue);
  };

  return (
    <StyledInput
      {...props}
      ref={ref}
      value={inputValue}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onKeyDown={onKeyDown}
    />
  );
}
