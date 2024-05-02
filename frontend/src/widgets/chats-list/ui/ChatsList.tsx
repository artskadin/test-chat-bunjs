import React from 'react';
import { Segmented } from 'antd';
import { useUnit } from 'effector-react';
import { UsersList } from '@/entities/users-list';
import { RoomsList } from '@/entities/rooms-list';
import { $chatType, changeChatType, options } from '@/widgets/chats-list/model';

import styles from './ChatsList.module.css';

function NonMemoChatsList() {
  const [chatType, changeChatTypeFn] = useUnit([$chatType, changeChatType]);

  return (
    <div className={styles.chatsListContainer}>
      <Segmented
        value={chatType}
        options={options}
        onChange={(value) => changeChatTypeFn(value as string)}
        block={true}
        size="middle"
      />

      <div className={styles.chatsList}>
        {chatType === 'users' && <UsersList />}
        {chatType === 'rooms' && <RoomsList />}
      </div>
    </div>
  );
}

export const ChatsList = React.memo(NonMemoChatsList);
