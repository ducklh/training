/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { OverLayContext } from '../components/OverLay/provider';

export default function useLoading(params) {
  const { setLoading } = useContext(OverLayContext);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return [showLoading, hideLoading];
}
