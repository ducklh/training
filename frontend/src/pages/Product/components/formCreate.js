/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
// import { Form } from 'react-bootstrap';
import React, { useEffect, useState, useRef } from 'react';
import {
  Form, Input, Button, Checkbox, Select, Upload, message, Alert,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function FormCreate({
  listCategory, listTypeProduct, onCreate,
}) {
  const [product, setProduct] = useState({
    name: '',
    productCode: '',
    categoryId: '',
    typeProductId: '',
    price: '',
    description: '',
  });
  const [fileData, setFileData] = useState([]);
  const [form] = Form.useForm();

  function handle(e) {
    console.log(e.target.value);
    const newData = { ...product };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setProduct(newData);
    newData.productCode = 'PRODUCTCODE';
    setProduct(newData);
  }
  function handleSelectCat(e) {
    const newData = { ...product };
    newData.categoryId = e;
    console.log(newData);
    setProduct(newData);
  }
  function handleSelectType(e) {
    const newData = { ...product };
    newData.typeProductId = e;
    console.log(newData);
    setProduct(newData);
  }
  function onChangFile(e) {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  }
  const typingTimeoutRef = useRef(null);
  function handleSubmit() {
    const data = new FormData();
    console.log(fileData);
    Object.keys(product).forEach((key) => data.append(key, product[key]));
    try {
      data.append('imgProduct', fileData);
    } catch (error) {
      console.log(error);
    }
    onCreate(data);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      document.getElementById('createForm').reset();
      setFileData([]);
    }, 500);
  }
  const { TextArea } = Input;
  const { Option } = Select;
  const onReset = () => {
    console.log('hehe');
    form.resetFields();
  };
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      setFileData(info.file.originFileObj);
      console.log(info.file.originFileObj);
    },
  };
  return (
    <>
      <Form
        className="form-create"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        id="createForm"
        encType="multipart/form-data"
      >
        {/* <Form.Item>
          <p> product</p>
        </Form.Item> */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: 'Please input product!' },
            { min: 3, message: 'Product must be minimum 3 characters.' },
            { whitespace: true },
          ]}
        >
          <Input id="name" onChange={(e) => handle(e)} />
        </Form.Item>

        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Select
            placeholder="Select category"
            id="categoryId"
            name="categoryId"
            onChange={(e) => handleSelectCat(e)}
          >
            {listCategory.map((cat) => (
              <Option value={cat._id}>{cat.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="typeProductId" label="Type Product" rules={[{ required: true }]}>
          <Select
            placeholder="Select type product"
            id="typeProductId"
            name="typeProductId"
            onChange={(e) => handleSelectType(e)}
          >
            {listTypeProduct.map((type) => (
              <Option value={type._id}>{type.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <div className="">
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: 'Please input price!' },
            ]}
          >
            <Input type="number" id="price" onChange={(e) => handle(e)} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input Description!',
              },
            ]}
          >
            <TextArea rows={4} id="description" onChange={(e) => handle(e)} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Upload
              {...props}
              listType="picture "
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>,
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
