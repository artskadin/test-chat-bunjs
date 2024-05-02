import React from 'react';
import { Tooltip, Typography } from 'antd';
import { ChatListItem } from '@/shared/ui/ChatListItem';
import { ChatListUserItem } from '@/shared/types';
import { useSelectedChat } from '@/features/select-chat';
import styles from '@/shared/ui/ChatListItem.module.css';

interface UsersListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ChatListUserItem;
}

export function UsersListItem({ item, ...props }: UsersListItemProps) {
  const { selectedChat } = useSelectedChat();

  return (
    <ChatListItem {...props} isSelected={selectedChat?.id === item.id}>
      <Tooltip title={item.name} placement="left">
        <Typography.Text className={styles.userName} ellipsis={true}>
          {item.name}
        </Typography.Text>
      </Tooltip>

      {item.hasNewMessage && (
        <Tooltip title={'New message'}>
          <div className={styles.unreadMessage} />
        </Tooltip>
      )}
    </ChatListItem>
  );
}
