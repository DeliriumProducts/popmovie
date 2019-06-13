import styled from '@emotion/styled';
import Router from 'next/router';
import { Card } from 'antd';
import { Button } from 'antd';

const MovieCard = styled(Card)`
  border: none;
  width: 250px;
`;

export default function Movie({
  title,
  image,
  id,
  clickable,
  loading = false
}) {
  return (
    <>
      <MovieCard
        loading={loading}
        bordered={false}
        hoverable
        cover={
          <img
            style={{
              objectFit: 'cover',
              height: 320
            }}
            alt={title}
            src={image}
          />
        }
        onClick={() => {
          if (clickable) {
            Router.push(`/movie/${id}`);
          }
        }}
      >
        <Card.Meta
          title={title}
          description={
            <Button
              type="primary"
              size="small"
              onClick={() => {
                window.location = 'https://netflix.com';
              }}
            >
              Watch now!
            </Button>
          }
        />
      </MovieCard>
    </>
  );
}
