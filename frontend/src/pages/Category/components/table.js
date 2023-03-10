/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
export default function Table({ listCategory, onDelete, onUpdate }) {
  console.log(listCategory);
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
    return listCategory.map((item, index) => (
      <tr>
        <td>
          {index + 1}
        </td>
        <td>
          {item.name}
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
  return (
    <>
      <table className="table table-hover" id="example">
        <thead className="thead-dark">
          <tr>
            <th className="col-lg-4 col-sm-4">STT</th>
            <th className="col-lg-4 col-sm-4">Name</th>
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
