import React from 'react';
import styled from '@emotion/styled';
import MovieCard from '../components/Movie';
import CreateButton from '../components/CreateButton';
import Spinner from '../components/Spinner';
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

const initialState = {
  title: '',
  image: '',
  description: ''
};

const reducerHandlers = {
  setTitle(state, title) {
    return {
      ...state,
      title
    };
  },
  setImage(state, image) {
    return {
      ...state,
      image
    };
  },
  setDescription(state, description) {
    return {
      ...state,
      description
    };
  },
  resetFields() {
    return initialState;
  }
};

const stateReducer = (state, { type, payload = null }) => {
  if (reducerHandlers[type]) {
    return reducerHandlers[type](state, payload);
  } else {
    return state;
  }
};

export default () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [movieState, dispatch] = React.useReducer(stateReducer, initialState);
  const [movieList, setMovieList] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged(setUser);
    firebase.db.collection('movies').onSnapshot(mList => {
      setMovieList(
        mList.docs.map(m => ({
          ...m.data(),
          id: m.id
        }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      {movieList.length > 0 &&
        movieList.map(movie => (
          <MovieCard key={movie.id} {...movie} clickable />
        ))}
      {user && <CreateButton onClick={() => setModalVisible(true)} />}
      <Modal
        title="Add new movie!"
        centered
        visible={modalVisible}
        onOk={async () => {
          setModalVisible(false);
          const result = await firebase.createMovie(movieState);
          console.log(result);
          dispatch({ type: 'resetFields' });
        }}
        onCancel={() => setModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              onChange={e =>
                dispatch({ type: 'setTitle', payload: e.target.value })
              }
              prefix={<Icon type="tag" />}
              value={movieState.title}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Input
              onChange={e =>
                dispatch({ type: 'setImage', payload: e.target.value })
              }
              prefix={<Icon type="picture" />}
              value={movieState.image}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              onChange={e =>
                dispatch({ type: 'setDescription', payload: e.target.value })
              }
              rows={2}
              prefix={<Icon type="info-circle" />}
              value={movieState.description}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};
