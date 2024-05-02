import React from 'react';
import { Typography } from 'antd';

import styles from './ChatInfo.module.css';

function NonMemoHeader() {
  return (
    <div className={styles.chatHeader}>
      <Typography>User name</Typography>
    </div>
  );
}

export const Header = React.memo(NonMemoHeader);
