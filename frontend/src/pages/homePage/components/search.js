/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined } from '@ant-design/icons';

// eslint-disable-next-line no-unused-vars
function PostFilterForm({ onChange }) {
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const typingTimeoutRef = useRef(null);

  function setSearchKey(e) {
    const value = e;
    setSearchTerm(value);
    if (!onChange) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onChange(formValue);
    }, 500);
  }

  return (
    <>
      <Input
        size="default "
        placeholder="Tìm sản phẩm..."
        bordered
        suffix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchKey(e.target.value)}
        style={{ width: 300 }}
      />
    </>
  );
}

export default PostFilterForm;
