import React from 'react';
import styled from '@emotion/styled';
import MovieCard from '../components/Movie';
import CreateButton from '../components/CreateButton';
import firebase from '../firebase';
import { Modal, Form, Input, Icon } from 'antd';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0.7rem;
  }
`;

export default () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <MovieCard
        title="John Wick"
        image="https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />
      <MovieCard
        title="Iron Man 3"
        image="https://s1.thcdn.com/productimg/1600/1600/10808803-5034529881593765.jpg"
      />

      {user && <CreateButton onClick={() => setModalVisible(true)} />}
      <Modal
        title="Add new movie!"
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input prefix={<Icon type="tag" />} />
          </Form.Item>
          <Form.Item label="Image">
            <Input prefix={<Icon type="picture" />} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea rows={2} prefix={<Icon type="info-circle" />} />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};
