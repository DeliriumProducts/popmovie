import React from 'react';
import styled from '@emotion/styled';
import MovieCard from '../components/Movie';
import CreateButton from '../components/CreateButton';
import firebase from '../firebase';
import { Modal } from 'antd';

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
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </Container>
  );
};
