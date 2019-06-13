import { Card, Icon } from 'antd';
import styled from '@emotion/styled';

const CreateButtonCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 75px;
  height: 75px;
`;

export default function CreateButton(props) {
  return (
    <div onClick={props.onClick}>
      <CreateButtonCard hoverable>
        <Icon type="plus" />
      </CreateButtonCard>
    </div>
  );
}
