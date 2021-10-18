import React, { useRef, useMemo, useState, useEffect } from 'react';

// 輸入搜尋功能
// prop list
// data search
// data selectValue
// onClick
// _onClose
// _onShow
// _onChange

export default function Modal(props) {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const [searchContent, setSearchContent] = useState('');
  const [show, setShow] = useState(props.show);

  const list = useMemo(() => {
    if (searchContent === '') return props.list;
    return props.list.filter((e) => {
      return e.code.toLowerCase().includes(searchContent.toLowerCase());
    });
  }, [searchContent]);

  const onClose = () => {
    props.onClose?.();
    setShow(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onChange = (e) => {
    setSearchContent(e.target.value);
  };

  const onListItemClick = (e) => {
    if (e.code === selectedValue) return;
    setSelectedValue(e.code);
    props.onSelect(e.code);
    onClose();
  };

  return (
    <>
      {show && (
        <>
          <div
            style={{
              background: 'black',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              opacity: 0.6,
            }}
            onClick={onClose}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 2,
              margin: 'auto',
              background: 'white',
              width: 400,
              height: 400,
              overflow: 'auto',
            }}
          >
            <input onChange={onChange} value={searchContent} />
            <ul>
              {list.map((el) => (
                <li
                  key={el.code}
                  onClick={() => onListItemClick(el)}
                  style={{
                    background: el.code === selectedValue && 'red',
                  }}
                >
                  {el.code}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
