import { withRouter } from 'next/router';
import { message } from 'antd';
import firebase from '../firebase';
import React from 'react';

function Movie({ router }) {
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    firebase
      .getMovie(router.query.movieId)
      .then(movie => {
        setMovie(movie);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        message.error(err);
      });
  }, [router.query.movieId]);

  return (
    <div>
      <pre>{JSON.stringify(2, null, movie)}</pre>
    </div>
  );
}

export default withRouter(Movie);
