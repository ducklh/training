/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';

import {
  Button, Table, Popconfirm, message, Modal,
} from 'antd';
import axios from 'axios';

export default function TableProduct({
  listProduct, listCategory, onDelete, onUpdate, total, onChangePage,
}) {
  const [id, setId] = useState();
  const [name, setName] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // const idProduct = document.getElementById('idProductDelete').value;
    // console.log(idProduct);
    onDeleteInTable(id);
    setIsModalVisible(false);
  };
  function onDeleteInTable(_id) {
    onDelete(_id);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const columns = [
    {
      title: 'Stt',
      render: (text, record, index) => index,
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      Width: 400,
    },
    {
      title: 'Product Code',
      dataIndex: 'productCode',
      width: 120,
    },
    {
      title: 'Category',
      render: (text, record) => (
        listCategory.filter((cateId) => cateId._id === record.categoryId)
          ? listCategory.filter((cateId) => cateId._id === record.categoryId).map((nameCate) => {
            if (nameCate) {
              return (
                <p>{nameCate.name}</p>
              );
            }
          }) : ''
      ),
      width: 70,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Update',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Link to={`update/${record._id}`}>
          <Button type="primary" className="" id="btnUpdate" data-toggle="tab">UPDATE</Button>
          {/* <Button type="primary" className="" id="btnUpdate" data-toggle="tab" href="#profile" onClick={() => updateProduct(record)}>UPDATE</Button> */}
        </Link>
      ),
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <>
          {/* <Button type="primary" id="btnDelete" className="" onClick={() => deleteProduct(record._id)} danger>DELETE</Button> */}
          {/* <Button type="primary" id="btnDelete" className="" onClick={showModal} danger>DELETE</Button> */}
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {/* {console.log(record)} */}
            <p>Do you want delelte {name}</p>
            <input id="idProductDelete" value={record._id} hidden />
          </Modal>
          <Button type="primary" className="" id="btnDelete" onClick={() => deleteProduct(record._id, record.name)} danger>DELETE</Button>
        </>
      ),
    },
  ];
  function deleteProduct(_id, name) {
    setId(_id);
    setName(name);
    showModal();
    // message.info(_id);
    // onDelete(_id);
  }
  function updateProduct(item) {
    onUpdate(item);
  }
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  function confirm() {
    message.info('Clicked on Yes.');
  }
  function handleChangePage(page, pageSize) {
    onChangePage(page, pageSize);
  }
  // const [category, setCate {gory] = useState('');
  // eslint-disable-next-line no-shadow
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listProduct}
        onChange={onChange}
        pagination={false}
        // pagination={{
        //   // eslint-disable-next-line object-shorthand
        //   total: 15,
        //   current: page,
        //   onChange: (page, pageSize) => {
        //     // setpage(page);
        //     // setPageSize(pageSize);
        //     handleChangePage(page, pageSize);
        //   },
        // }}
      />
    </>
  );
}
