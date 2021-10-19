import React, { useMemo, useState, useEffect } from 'react';

import { StyledMask, StyledModal, StyledSearchInput, StyledList, StyledListItem } from './style';

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
        <div>
          <StyledMask onClick={onClose} />
          <StyledModal>
            <StyledSearchInput
              onChange={onChange}
              value={searchContent}
              placeholder={'Search currency'}
            />
            <StyledList>
              {list.map((el) => (
                <StyledListItem
                  key={el.code}
                  onClick={() => onListItemClick(el)}
                  $selected={el.code === selectedValue}
                >
                  {el.code}
                </StyledListItem>
              ))}
            </StyledList>
          </StyledModal>
        </div>
      )}
    </>
  );
}
