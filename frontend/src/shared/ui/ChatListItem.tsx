import React from 'react';
import cn from 'classnames';
import styles from './ChatListItem.module.css';

interface ChatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected: boolean;
}

export function ChatListItem({ isSelected, ...props }: ChatListItemProps) {
  return <div className={cn(styles.chatListItem, { [styles.chatListItemSelected]: isSelected })} {...props} />;
}
