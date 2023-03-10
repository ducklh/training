/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../api/axios';
import { List, ListItem, Container } from './styles';
// import { OverLayContext } from '../../components/OverLay/provider';
import useLoading from '../../hooks/useLoading';

export default function ExamplePage() {
  const [posts, setPosts] = useState([]);
  // const { setLoading } =  useContext(OverLayContext);

  const [showLoading, hideLoading] = useLoading();

  const getData = async () => {
    try {
      // setLoading(true);
      showLoading();
      const data = await axiosInstance.get('/example');
      if (data) {
        setPosts(data);
      }
      // setLoading(false);
      hideLoading();
    } catch (e) {
      // setLoading(false);
      showLoading();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1>Example</h1>
      <List>
        {posts.map((item, index) => (
          <ListItem key={index}>{item.title}</ListItem>
        ))}
      </List>
    </Container>
  );
}
