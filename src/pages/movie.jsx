import { withRouter } from 'next/router';
import styled from '@emotion/styled';
import MovieCard from '../components/Movie';
import { message, Typography, Divider, Card } from 'antd';
import firebase from '../firebase';
import React from 'react';
import { THEME_VARIABLES } from '../config/env';

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 75%;
  flex-wrap: wrap;
`;

const MovieDescription = styled(Card)`
  flex: 2;
  font-weight: bold;
  margin: 2rem;
  height: 100%;
  border-radius: ${THEME_VARIABLES['@border-radius-base']};
  padding: 2rem;
`;

function Movie({ router }) {
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    firebase
      .getMovie(router.query.movieId)
      .then(movie => {
        setMovie(movie.data());
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        message.error(err);
      });
  }, [router.query.movieId]);

  if (loading) {
    return (
      <MovieContainer>
        <MovieCard loading />
        <MovieDescription loading />
      </MovieContainer>
    );
  }

  return (
    <MovieContainer>
      <MovieCard {...movie} />
      <MovieDescription hoverable>
        <Typography.Title>{movie.title}</Typography.Title>
        <Divider />
        <Typography.Paragraph>{movie.description}</Typography.Paragraph>
      </MovieDescription>
    </MovieContainer>
  );
}

export default withRouter(Movie);
