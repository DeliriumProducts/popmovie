import { Spin, Icon } from 'antd';
import { THEME_VARIABLES } from '../config/env';

const Spinner = () => (
  <Spin
    indicator={
      <Icon
        style={{ color: THEME_VARIABLES['@primary-color'] }}
        type="loading"
        spin
      />
    }
  />
);

export default Spinner;
