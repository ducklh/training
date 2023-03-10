import axiosClient from './apiAxiosClient';

const productsApi = {
  getAll: (params) => {
    const url = 'products';
    return axiosClient.get(url, { params });
  },
  searchName: (params) => {
    const url = 'products';
    return axiosClient.get(url, { params });
  },
  // create: (params) => {
  //   const url = 'products';
  //   return axios.post(url, params).then((res) => {
  //     manageAlert(Message.THEM_THANH_CONG);
  //     return res && res.data;
  //   });
  // },
};

//   get: (_id) => {
//     const url = `${Api.server}/products/${_id}`;
//     return axios.get(url).then((res) => {
//       return res && res.data;
//     });
//   },

//   update: (formData, id) => {
//     const url = `${Api.server}/products/${id}`;
//     return axios.patch(url, formData).then((res) => {
//       manageAlert(Message.SUA_THANH_CONG);
//       return res.data;
//     });
//   },

//   delete: (_id) => {
//     const url = `${Api.server}/products/${_id}`;
//     manageAlert(Message.XOA_THANH_CONG);
//     return axios.delete(url);
//   },
export default productsApi;
