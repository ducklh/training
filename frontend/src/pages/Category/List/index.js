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
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-unresolved
// import { Button, ButtonIcon } from 'react-rainbow-components';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import * as Api from '../../../constants/api';
import Table from '../components/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import useLoading from '../../../hooks/useLoading';

export default function PageCategories() {
  const [showLoading, hideLoading] = useLoading();
  const [listCategory, setCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState('');
  const [currenId, setCurrentId] = useState(null);
  const handleChange = (event) => {
    setNameCategory({
      ...nameCategory,
      [event.target.name]: event.target.value,
    });
  };
  // eslint-disable-next-line no-undef
  function onDelete(_id) {
    axios.delete(`http://localhost:3000/v1/categories/${_id}`, nameCategory).then(() => { getData(); });
  }
  function handleSubmit() {
    axios.post('http://localhost:3000/v1/categories/', nameCategory).then((res) => {
      document.getElementById('createForm').reset();
      getData();
    });
  }
  function getIdCategory(item) {
    document.getElementById('nameEdit').value = item.name;
    setCurrentId(item._id);
  }
  function updateCategory() {
    axios.patch(`http://localhost:3000/v1/categories/${currenId}`, nameCategory).then((res) => {
      document.getElementById('editForm').reset();
      getData();
    });
  }
  useEffect(async () => {
    getData();
  }, []);
  const getData = () => {
    showLoading();
    axios.get(Api.apiCategories).then((res) => {
      setCategory(res.data);
      hideLoading();
    });
    hideLoading();
  };

  return (
    <div id="colorlib-main">
      <aside id="colorlib-hero" className="js-fullheight justify-content-center">
        <div className="container">
          <div className="col-lg-8">
            <div className="container-fluid row-col mt-4 ">
              {/* <!-- Page Heading --> */}
              <div className="row row-table">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 align-items-center justify-content-between">

                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h5 className=" mb-0 text-gray-800 ml-2">Quản lý Danh Mục</h5>
                      </div>
                      <div className="row">
                        <Table listCategory={listCategory} onDelete={onDelete} onUpdate={getIdCategory} />
                      </div>
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <h3 className="register-heading">Create Category</h3>
                          <div className="row register-form ml-1">
                            <Form className="" id="createForm">
                              <div className="form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Enter name category" onChange={handleChange} />
                              </div>
                              <Button onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                            </Form>
                          </div>
                        </div>
                        <div className="tab-pane show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                          <h3 className="register-heading">Edit Category</h3>
                          <div className="row register-form ml-1">
                            <Form className="" id="editForm">
                              <div className="form-group">
                                <input type="text" name="name" className="form-control" id="nameEdit" placeholder="Enter name category" onChange={handleChange} />
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
