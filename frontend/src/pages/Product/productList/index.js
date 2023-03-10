/* eslint-disable no-shadow */
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
import { Button, Form } from 'react-bootstrap';
import { Pagination, notification } from 'antd';
import * as Api from '../../../constants/api';
import TableProduct from '../components/table';
import FormCreate from '../components/formCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import productsApi from '../../../api/productsApi';

export default function PageProductsItem() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 6,
  });
  const [pagina, setPagina] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const [currenId, setCurrentId] = useState(null);
  const [typeProduct, setTypeProduct] = useState({
    name: '',
    categoryId: '',
  });
  const [product, setProduct] = useState({
    name: '',
    productCode: '',
    categoryId: '',
    typeProductId: '',
    price: '',
    description: '',
    imgProduct: [],
  });
  function handle(e) {
    const newData = { ...product };
    e.target.id = e.target.value;
    // e.target.id === 'price' ? newData[e.target.id] = 2 : newData[e.target.id] = e.target.value;
    setProduct(newData);
    console.log(newData);
  }
  const openNotificationWithIcon = (type, res) => {
    notification[type]({
      message: 'Thêm thành công',
      description:
      `Name: ${res.data.name}`,
    });
  };
  function onDelete(_id) {
    axios.delete(`http://localhost:3000/v1/products/${_id}`).then(() => { getData(); });
  }
  function onCreate(value) {
    console.log(value);
    axios.post('http://localhost:3000/v1/products/create', value).then((res) => {
      console.log(res);
      openNotificationWithIcon('success', res);
      getData();
    });
  }
  function getIdCategory(item) {
    console.log(item);
    document.getElementById('name').value = item.name;
    const newData = { ...typeProduct };
    newData.name = item.name;
    newData.categoryId = item.categoryId;
    setTypeProduct(newData);
    setCurrentId(item._id);
  }
  function updateCategory() {
    axios.patch(`http://localhost:3000/v1/typeProducts/${currenId}`, typeProduct).then((res) => {
      console.log(currenId);
      console.log(typeProduct);
      document.getElementById('editForm').reset();
      getData();
    });
  }
  function handleChangePage(page, pageSize) {
    setFilter((filter) => ({ ...filter, page }));
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const reponProduct = await productsApi.getAll(filter);
        setListProduct(reponProduct.data.data);
        setPagina(reponProduct.data.total);
      } catch (error) {
        console.log('Failed to Fetch all', error);
      }
      axios.get(Api.apiCategories).then((cat) => {
        setListCategory(cat.data);
      });
      axios.get(Api.apiType).then((type) => {
        setListTypeProduct(type.data);
      });
    };
    getData(filter);
  }, [filter]);
  const getData = () => {
    try {
      const reponProduct = productsApi.getAll(filter).then((token) => setListProduct(token.data.data));
      setPagina(reponProduct.data.total);
    } catch (error) {
      console.log('Failed to Fetch all', error);
    }
    axios.get(Api.apiCategories).then((cat) => {
      setListCategory(cat.data);
    });
    axios.get(Api.apiType).then((type) => {
      setListTypeProduct(type.data);
    });
  };
  return (
    <div id="colorlib-main">
      <aside id="" className="">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-12">
              <div className=" mb-4 ">
                <div className="py-3 align-items-center justify-content-between">
                  <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-2">
                    <h5 className=" mb-0 text-gray-800 ml-2 text-uppercase">Quản lý Sản Phẩm</h5>
                  </div>
                  <div className="row row-table-right">
                    <TableProduct listProduct={listProduct} listCategory={listCategory} onDelete={onDelete} onUpdate={getIdCategory} />
                  </div>
                  <Pagination
                    className="mt-4"
                    total={pagina}
                    pageSize={6}
                    onChange={(page, pageSize) => handleChangePage(page, pageSize)}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-8 mt-xl-4">
              <div className="" id="myTabContent">
                <div className="" id="" role="tabpanel" aria-labelledby="home-tab">
                  <h3 className="register-heading text-right">Create Product Form</h3>
                  <div className="">
                    <FormCreate listCategory={listCategory} listTypeProduct={listTypeProduct} onCreate={onCreate} total={pagina} onChangePage={handleChangePage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
