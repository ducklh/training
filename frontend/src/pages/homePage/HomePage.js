/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Empty, Input, Select, Pagination, Row, Col, Image,
} from 'antd';
import * as Api from '../../constants/api';
import productsApi from '../../api/productsApi';
import PostFilterForm from './components/search';

export default function HomePage() {
  const [listProduct, setListProduct] = useState([]);
  const addressImage = 'http://localhost:3000/uploads/';
  const [listCate, setListCate] = useState([]);
  const [listType, setListType] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 6,
  });
  const { Option } = Select;
  const [pagina, setPagina] = useState();
  const handleChangeAll = (value) => {
    console.log(value);
  };

  function handleChangePage(page, pageSize) {
    setFilter((filter) => ({ ...filter, page }));
  }
  function formatCash(price) {
    const str = `${price}`;
    return str.split('').reverse().reduce((prev, next, index) => ((index % 3) ? next : (`${next},`)) + prev);
  }
  const changeTypeTheoCategory = (value) => {
    if (value === 'all') {
      setFilter(null);
      setDataType([]);
    } else {
      setDataType(listType.filter((item) => item.categoryId === value));
      setFilter((prevFilter) => ({ ...prevFilter, categoryId: value }));
    }
  };
  const handleChangeType = (value) => {
    setFilter((prevFilter) => ({ ...prevFilter, typeProductId: value }));
  };
  const handleOnchange = (newFilter) => {
    // eslint-disable-next-line no-unused-expressions
    newFilter.searchTerm === ''
      ? setFilter((prevFilter) => ({ page: 1 }))
      : setFilter((prevFilter) => ({ ...prevFilter, page: 1, name: newFilter.searchTerm }));
  };
  const searchName = async () => {
    try {
      const reponProduct = await productsApi.getAll(filter);
      setListProduct(reponProduct.data.data);
      setPagina(reponProduct.data.total);
    } catch (error) {
      console.log('Failed to Fetch all', error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const getData = async () => {
      const reponProduct = await productsApi.getAll(filter);
      setListProduct(reponProduct.data.data);
      console.log(reponProduct.data.data);
      setPagina(reponProduct.data.total);
      // axios.get(Api.apiProducts).then((res) => {
      //   setListProduct(res.data.data);
      //   console.log(res.data.data);
      //   setPagina(res.data.total);
      // });
    };
    getData(filter);
  }, [filter]);
  useEffect(() => {
    try {
      axios.get(Api.apiType).then((res) => {
        setListType(res.data);
      });
      axios.get(Api.apiCategories).then((cat) => {
        setListCate(cat.data);
      });
    } catch (error) {
      console.log('Failed to Fetch all', error);
    }
  }, []);
  return (
    <div id="colorlib-main">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">DANH SÁCH SẢN PHẨM</a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Select
                defaultValue="-- Loại Sản Phẩm --"
                style={{ width: 170, marginRight: '20px' }}
                onChange={changeTypeTheoCategory}
              >
                <Option onChange={handleChangeAll} value="all">--Tất cả--</Option>
                {console.log(listCate)}
                {
                    listCate.map((item, index) => {
                      if (item) {
                        return (
                          <>
                            <Option key={index} value={item._id}>{item.name}</Option>
                          </>
                        );
                      }
                    })
                    }
              </Select>
            </li>
            <li className="nav-item">
              {
                    dataType.length < 1
                      ? <Select defaultValue="-- Danh Mục --" style={{ width: 170, marginRight: '20px' }} disabled />
                      : (
                        <Select
                          defaultValue="-- Danh Mục --"
                          style={{ width: 170, marginRight: '20px' }}
                          onChange={handleChangeType}
                        >
                          {dataType.map((item, index) => {
                            if (item) {
                              return (
                                <>
                                  <Option key={index} value={item._id}>{item.name}</Option>
                                </>
                              );
                            }
                          })}
                        </Select>
                      )
                  }
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li> */}
          </ul>
          <PostFilterForm onChange={handleOnchange} />
        </div>
      </nav>
      <aside id="colorlib-hero" className="js-fullheight justify-content-center ">
        <div className="row justify-content-start">
          {listProduct.map((product) => (
            <><div className="card col-lg-3 m-5 justify-content-center text-center  mx-0 px-0 card-home">
              {Array.isArray(product && product.imgProduct) && product.imgProduct.length
               > 0 ? product.imgProduct.map((item, id) => {
                  if (id === 0) {
                    <>
                      <img className="card-img-top zoom" src={addressImage + item} />;
                    </>;
                  }
                }) : <> <img className="card-img-top zoom" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" />;</>}
              <Image className="card-img-top zoom" src={addressImage + product.imgProduct[0]} alt="Card image cap" />
              <div className="card-body">
                <Link to={`detail/${product._id}`}>
                  <p className="card-text text-uppercase text-name">{product.name}</p>
                </Link>
                <h5 className="card-title">{formatCash(product.price)} VND</h5>
                {/* <a href="#" className="btn">Go somewhere</a> */}
                <Row className="mt-4">
                  <Link to={`detail/${product._id}`} id="a-btn-buy-home"> BUY NOW
                  </Link>
                </Row>
              </div>
            </div>
            </>
          ))}
        </div>
        <Pagination
          className="ml-4"
          total={pagina}
          pageSize={6}
          onChange={(page, pageSize) => handleChangePage(page, pageSize)}
        />
      </aside>
    </div>
  );
}
