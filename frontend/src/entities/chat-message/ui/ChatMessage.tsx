import React from 'react';
import { Message } from '@/widgets/chat-info/ui/Content';
import { Typography } from 'antd';
import cn from 'classnames';

import styles from './ChatMessage.module.css';

interface NonMemoChatMessageProps {
  message: Message;
  isSender: boolean;
}

function NonMemoChatMessage({ message, isSender }: NonMemoChatMessageProps) {
  return (
    <div
      className={cn(styles.chatMessage, {
        [styles.chatMessageSent]: isSender,
        [styles.chatMessageReceived]: !isSender,
      })}
    >
      {!isSender && <div className={styles.chatMessageUsername}>{message.from}</div>}

      <div className={styles.chatMessageBody}>
        <Typography.Text>{message.text}</Typography.Text>
        <div className={styles.chatMessageTime}>
          {message.timestamp.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export const ChatMessage = React.memo(NonMemoChatMessage);
