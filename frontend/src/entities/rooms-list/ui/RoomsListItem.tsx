import React from 'react';
import { ChatListItem } from '@/shared/ui/ChatListItem';
import { ChatListRoomItem } from '@/shared/types';
import { Tooltip, Typography } from 'antd';
import { useSelectedChat } from '@/features/select-chat';
import styles from '@/shared/ui/ChatListItem.module.css';

interface RoomsListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ChatListRoomItem;
}

export function RoomsListItem({ item, ...props }: RoomsListItemProps) {
  const { selectedChat } = useSelectedChat();

  return (
    <ChatListItem {...props} isSelected={selectedChat?.id === item.id}>
      <Tooltip title={item.name} placement="left">
        <Typography.Text className={styles.userName} ellipsis={true}>
          #{item.name}
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
