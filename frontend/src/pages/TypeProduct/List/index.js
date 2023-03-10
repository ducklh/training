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
import * as Api from '../../../constants/api';
import Table from '../components/table';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/order
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function PageType() {
  const [listCategoryType, setCategoryType] = useState([]);
  const [listCategory, setCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState('');
  const [nameTypeProduct, setNameTypeProduct] = useState('');
  const [currenId, setCurrentId] = useState(null);
  const [typeProduct, setTypeProduct] = useState({
    name: '',
    categoryId: '',
  });
  // set name type
  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNameTypeProduct({
      ...nameTypeProduct,
      [event.target.name]: event.target.value,
    });
  };
  function handle(e) {
    const newData = { ...typeProduct };
    newData[e.target.id] = e.target.value;
    setTypeProduct(newData);
    console.log(newData);
  }
  function onDelete(_id) {
    axios.delete(`http://localhost:3000/v1/typeProducts/${_id}`).then(() => { getData(); });
  }
  function handleSubmit(value) {
    axios.post('http://localhost:3000/v1/typeProducts/', typeProduct).then((res) => {
      console.log(res);
      document.getElementById('createForm').reset();
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
  useEffect(async () => {
    getData();
  }, []);
  const getData = () => {
    axios.get(Api.apiType).then((res) => {
      setCategoryType(res.data);
    });
    axios.get(Api.apiCategories).then((cat) => {
      setCategory(cat.data);
    });
  };
  function changeFunc() {
    const selectBox = document.getElementById('selectBox');
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    setNameTypeProduct(selectedValue);
  }
  return (
    <div id="colorlib-main">
      {console.log(listCategory)}
      <aside id="colorlib-hero" className="js-fullheight justify-content-center">
        <div className="container">
          <div className="col-lg-8">
            <div className="container-fluid row-col mt-4 ">
              {/* <!-- Page Heading --> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 align-items-center justify-content-between">
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h5 className=" mb-0 text-gray-800 ml-2">Quản lý Loại Sản Phẩm</h5>
                      </div>
                      <div className="row row-table-right">
                        <Table listCategoryType={listCategoryType} listCategory={listCategory} onDelete={onDelete} onUpdate={getIdCategory} />
                      </div>
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <h3 className="register-heading">Type Product</h3>
                          <div className="row register-form ml-1">
                            <Form className="" id="createForm">
                              <div className="">
                                <div className="form-group">
                                  <label> Name Type Product </label>
                                  <input type="text" name="name" className="form-control" id="name" placeholder="Enter Type Product Name" onChange={(e) => handle(e)} value={typeProduct.name} />
                                </div>
                                <div className="form-group ">
                                  <label> Name Category </label>
                                  <select className="form-control " name="categoryId" id="categoryId" onChange={(e) => handle(e)} value={typeProduct.categoryId}>
                                    {
                          listCategory.map((category) => (
                            <option value={category._id}>{category.name}</option>
                          ))
                        }
                                  </select>
                                </div>
                                <Button onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                              </div>
                            </Form>
                          </div>
                        </div>
                        <div className="tab-pane show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                          <h3 className="register-heading">Edit Category</h3>
                          <div className="row register-form ml-1">
                            <Form className="" id="editForm">
                              <div className="form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Enter name type product" onChange={(e) => handle(e)} value={typeProduct.name} />
                              </div>
                              <div className="form-group ">
                                <label> Name Category </label>
                                <select className="form-control " name="categoryId" id="categoryId" onChange={(e) => handle(e)} value={typeProduct.categoryId}>
                                  {
                          listCategory.map((category) => (
                            <option value={category._id}>{category.name}</option>
                          ))
                        }
                                </select>
                              </div>
                              <Button onClick={updateCategory} className="btn btn-primary">Submit</Button>
                              <Button variant="danger ml-4 " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Cancel</Button>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
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
