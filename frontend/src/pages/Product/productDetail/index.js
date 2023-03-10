/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
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
import { Button, Form } from 'react-bootstrap';
import * as Api from '../../../constants/api';
import TableProduct from '../components/table';
import FormCreate from '../components/formCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/order
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useParams } from 'react-router-dom';
import {
  Carousel, Card, Row, Col,
} from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import ReactImageZoom from 'react-image-zoom';

export default function ProductDetail({
  product,
}) {
  const addressImage = 'http://localhost:3000/uploads/';
  const params = useParams();
  console.log(params.id);
  const [productDetail, setProduct] = useState();
  const [listCategory, setListCategory] = useState();
  const [listTypeProduct, setListTypeProduct] = useState();

  const contentStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  function formatCash(price) {
    const str = `${price}`;
    return str.split('').reverse().reduce((prev, next, index) => ((index % 3) ? next : (`${next},`)) + prev);
  }
  const { Meta } = Card;
  // function getData() {
  //   axios.get(`http://localhost:3000/v1/products/${params.id}`).then((res) => {
  //     console.log(params);
  //     console.log(res);
  //     setProduct(res.data);
  //   });
  // }
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const getData = async () => {
      try {
        axios.get(`http://localhost:3000/v1/products/${params.id}`).then((res) => {
          setProduct(res.data);
          console.log(res.data);
        });
        axios.get(Api.apiType).then((res) => {
          setListTypeProduct(res.data);
        });
        axios.get(Api.apiCategories).then((cat) => {
          setListCategory(cat.data);
        });
      } catch (error) {
        console.log('Failed to Fetch all', error);
      }
      // axios.get(Api.apiProducts).then((res) => {
      //   setListProduct(res.data.data);
      //   console.log(res.data.data);
      //   setPagina(res.data.total);
      // });
    };
    getData();
  }, []);

  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const props = {
    width: 400, height: 250, zoomWidth: 500, img: '1.jpg',
  };
  return (
    <div id="colorlib-main">
      {console.log(listTypeProduct)}
      <div className="container mt-5">
        <div className="">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <Carousel autoplay afterChange={onChange}>
                  {productDetail?.imgProduct.map((img) => (
                    <div>
                      <img
                        style={contentStyle}
                        src={addressImage + img}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  ))}
                </Carousel>,
              </div>
              {/* {listTypeProduct.length ? console.log(listTypeProduct) : console.log(null)} */}
              <div className="preview col-md-6">
                <h3 className="h3-name-detail">{productDetail?.name}</h3>
                <h4 className="h3-name-detail">{formatCash(productDetail?.price)} VNĐ</h4>
                <p className="p-code-detail">{productDetail?.productCode}</p>
                <div className="icon-star">
                  <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarOutlined />
                </div>
                <p className="p-desc-detail">{productDetail?.description}</p>
                <Row>
                  <Col className="p-cat-detail" span={5}>Category</Col>
                  <Col span={12}>
                    {
                      listCategory ? listCategory.filter((cateId) => cateId._id === productDetail?.categoryId)
                        ? listCategory.filter((cateId) => cateId._id === productDetail?.categoryId).map((nameCate) => (
                          <p>{nameCate.name}</p>
                        )) : '' : <p>No category</p>

          }
                  </Col>
                  {/* {listTypeProduct.map((type) => console.log(type?.name))} */}
                </Row>
                <Row>
                  <Col className="p-cat-detail" span={5}>Type Product</Col>
                  <Col span={12}>
                    {
                      listTypeProduct ? listTypeProduct.filter((cateId) => cateId._id === productDetail?.typeProductId)
                        ? listTypeProduct.filter((cateId) => cateId._id === productDetail?.typeProductId).map((nameCate) => (
                          <p>{nameCate.name}</p>
                        )) : '' : <p>No category</p>

          }
                  </Col>

                </Row>

                <hr />
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col className="add-mi" />
                      <Col className="qt-minus col">-</Col>
                      <Col className="qt col">1</Col>
                      <Col className="qt-plus col">+</Col>
                    </Row>
                  </Col>
                </Row>
                {/* <Row>
                  <Col span={11}>
                    <a id="a-btn2"> ADD TO CART €650
                    </a>
                  </Col>
                  <Col span={11}>
                    <a id="a-btn2"> ADD TO CART €650
                    </a>
                  </Col>
                </Row> */}
                <Row className="mt-4">
                  <Col span={11}>
                    <a id="a-btn2"> BUY NOW
                    </a>
                  </Col>
                  <Col span={11} offset={2}>
                    <a id="a-btn2"> ADD TO CART €650
                    </a>
                  </Col>
                </Row>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
