import styled from '@emotion/styled';
import Button from '../components/Button';
import Link from 'next/link';
import { keyframes } from '@emotion/core';
import { THEME_VARIABLES } from '../config/env';

import { Card } from 'antd';

const { Meta } = Card;

export default () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
