import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { Content } from './Content';

import styles from './ChatInfo.module.css';

function NonMemoChatInfo() {
  const { id: chatId } = useParams();

  return (
    <div className={styles.chatInfo}>
      {chatId ? (
        <Content />
      ) : (
        <Typography.Text className={styles.chatInfoEmpty} type="secondary">
          Select chat and enjoy
        </Typography.Text>
      )}
    </div>
  );
}

export const ChatInfo = React.memo(NonMemoChatInfo);
