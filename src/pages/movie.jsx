import { withRouter } from 'next/router';
import MovieCard from '../components/Movie';
import { message } from 'antd';
import Spinner from '../components/Spinner';
import firebase from '../firebase';
import React from 'react';

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
    return <MovieCard loading />;
  }

  return (
    <div>
      <MovieCard {...movie} />
    </div>
  );
}

export default withRouter(Movie);
