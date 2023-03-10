/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/order
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useParams } from 'react-router-dom';
import { Carousel } from 'antd';
import {
  Form, Input, Button, Checkbox, Select, Upload, message, Alert, Modal, Image,
} from 'antd';
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import * as Api from '../../../constants/api';

export default function ProductUpdate({
  product,
}) {
  const [productUpdate, setProduct] = useState({
    name: '',
    productCode: '',
    categoryId: '',
    typeProductId: '',
    price: '',
    description: '',
  });
  const [productHehe, setProductHehe] = useState();
  const [productDetail, setProductDetail] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const addressImage = 'http://localhost:3000/uploads/';
  const params = useParams();
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;
  const [image1, setImage1] = useState();
  const addressIMG1 = addressImage + productDetail?.imgProduct[0];
  const addressnull = `${addressImage}null-image.png`;
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: `${addressImage + productDetail?.imgProduct[0]}`,
    fileList: [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: `${addressImage + image1}`,
      // url: '',
    }],
  });
  const { previewVisible, previewImage, fileList } = state;
  const uploadButton = (
    <div>
      <PlusOutlined type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  // const initialValues = productDetail;
  // if (initialValues !== null) {
  //   var dataInitialValue = {};
  // } else {
  //   dataInitialValue = initialValues;
  // }
  const onFinish = (e) => {
    console.log(e);
    setProductHehe(e);
    const data = new FormData();
    Object.keys(productHehe).forEach((key) => data.append(key, productHehe[key]));
    try {
      data.append('productCode', productDetail?.productCode);
      fileList.forEach((element) => {
        data.append('imgProduct', element.originFileObj);
      });
      axios.patch(`http://localhost:3000/v1/products/${params.id}`, data).then((res) => {
        console.log(res);
        getData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    getData();
    form.resetFields();
    // form.setFieldsValue(dataInitialValue);
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(productDetail);
    setFileData(productDetail?.imgProduct);
    setImage1(productDetail?.imgProduct[0]);
    console.log(productDetail);
    setState({
      previewVisible: false,
      previewImage: `${addressImage + productDetail?.imgProduct[0]}`,
      fileList: [{
        uid: '-1',
        status: 'done',
        url: `${productDetail && productDetail.imgProduct ? addressImage + productDetail?.imgProduct[0] : 'hehe'}`,
      // url: '',
      },
      {
        uid: '-1',
        status: 'done',
        url: `${productDetail && addressImage + productDetail?.imgProduct[1]}`,
      // url: '',
      },
      {
        uid: '-1',
        status: 'done',
        url: `${productDetail && addressImage + productDetail?.imgProduct[2]}`,
      // url: '',
      },
      {
        uid: '-1',
        status: 'done',
        url: `${productDetail && productDetail?.imgProduct[3] ? addressImage + productDetail?.imgProduct[3] : addressnull}`,
      // url: '',
      },
      ],
    });
  }, [form, productDetail]);

  function getData() {
    axios.get(`http://localhost:3000/v1/products/${params.id}`).then((res) => {
      setProductDetail(res.data);
    });
    axios.get(Api.apiCategories).then((cat) => {
      setListCategory(cat.data);
    });
    axios.get(Api.apiType).then((type) => {
      setListTypeProduct(type.data);
    });
    form.setFieldsValue(productDetail);
  }
  function handle(e) {
    console.log(e.target.value);
    const newData = { ...productUpdate };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setProduct(newData);
    newData.productCode = 'PRODUCTCODE';
    setProduct(newData);
  }
  function handleSelectCat(e) {
    const newData = { ...productUpdate };
    newData.categoryId = e;
    console.log(newData);
    setProduct(newData);
  }
  function handleSelectType(e) {
    const newData = { ...productUpdate };
    newData.typeProductId = e;
    console.log(newData);
    setProduct(newData);
  }

  function handleCancel() { setState({ previewVisible: false }); }

  function handlePreview(file) {
    setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  function handleChange(fileListChange) {
    console.log(fileListChange);
    console.log(fileData);
    setState(fileListChange);
  }

  return (
    <div id="colorlib-main">
      {console.log(fileData)}
      <div className="container mt-5">
        <div className="">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <Form
                  form={form}
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
                  autoComplete="off"
                  id="createForm"
                  encType="multipart/form-data"
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                      { required: true, message: 'Please input product!' },
                      { min: 3, message: 'Product must be minimum 3 characters.' },
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
                          message: 'Invalid price!',
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
                      <Image
                        width={200}
                        src={addressImage + productDetail?.imgProduct[0]}
                      />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              <div className="preview col-md-6 row">
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={(file) => {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        // console.log(e.target.result);
                      };
                      reader.readAsText(file);

                      // Prevent upload
                      return false;
                    }}
                  >
                    {fileList.length >= 4 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
