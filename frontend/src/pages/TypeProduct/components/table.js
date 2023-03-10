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
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [
  {
    dataField: 'todo_id',
    text: 'id',
  },
  {
    dataField: 'todo_description',
    text: 'description',
    sort: true,
  },
  {
    dataField: 'todo_priority',
    text: 'priority',
    sort: true,
  },
];
export default function Table({
  listCategoryType, listCategory, onDelete, onUpdate,
}) {
  function deleteCategory(_id) {
    onDelete(_id);
  }
  function updateCategory(item) {
    onUpdate(item);
  }
  // const [category, setCate {gory] = useState('');
  // eslint-disable-next-line no-shadow
  function renderCategories() {
    // eslint-disable-next-line no-console
    // console.log(listCategory);
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line array-callback-return
    console.log(listCategory);
    return listCategoryType.map((item, index) => (
      <tr>
        <td>
          {index + 1}
        </td>
        <td>
          {item.name}
        </td>
        <td>
          {
            listCategory.filter((cateId) => cateId._id === item.categoryId)
              ? listCategory.filter((cateId) => cateId._id === item.categoryId).map((nameCate) => (
                <p>{nameCate.name}</p>
              )) : ''
          }
        </td>
        <td>
          <button className="btn btn-primary" id="btnUpdate" data-toggle="tab" href="#profile" onClick={() => updateCategory(item)}>Update</button>
        </td>
        <td>
          <button className="btn btn-secondary" onClick={() => deleteCategory(item._id)}>Delete</button>
        </td>
      </tr>
    ));
  }
  const rs = renderCategories();
  // function getName(id) {
  //   listCategory.forEach((element) => {
  //     if (element._id === id) {
  //       console.log(element.name);
  //       return element.name;
  //     }
  //   });
  // }
  const columns = [{
    dataField: '_id',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
  },
  {
    dataField: 'categoryId',
    text: 'Category',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Action',
  },
  ];
  return (
    <>
      <table
        className="table table-hover"
        keyField="id"
        id="example"
        striped
        hover
        pagination={paginationFactory()}
      >
        <thead>
          <tr className="thead-dark">
            <th className="col-lg-4 col-sm-4">STT</th>
            <th className="col-lg-4 col-sm-4">Name</th>
            <th className="col-lg-4 col-sm-4">Category</th>
            <th className="col-lg-2 col-sm-2" />
            <th className="col-lg-2 col-sm-2" />
          </tr>
        </thead>
        <tbody>
          {/* {renderCategories(listCategory)} */}
          {rs}
        </tbody>
      </table>
    </>
  );
}
