import styled from '@emotion/styled';
import { Card } from 'antd';
import { Button, Icon } from 'antd';

const MovieCard = styled(Card)`
  border: none;
  width: 250px;
`;

export default function Movie({ title, image }) {
  return (
    <>
      <MovieCard
        hoverable
        cover={<img style={{ objectFit: 'cover' }} alt={title} src={image} />}
      >
        <Card.Meta
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{title}</span>
              <Button type="primary" size="small">
                Watch now!
              </Button>
            </div>
          }
        />
      </MovieCard>
    </>
  );
}
