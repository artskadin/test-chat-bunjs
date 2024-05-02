import React from 'react';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { RoomsListItem } from '@/entities/rooms-list/ui/RoomsListItem';
import { Button, Input } from 'antd';
import { useUnit } from 'effector-react/effector-react.umd';
import { $filteredRoomsList, $queryRoom, searchRoom } from '@/entities/rooms-list/model';
import { useSelectedChat } from '@/features/select-chat';

import styles from './RoomsList.module.css';

function NonMemoRoomsList() {
  const roomsList = useUnit($filteredRoomsList);
  const { selectChatFn } = useSelectedChat();
  const [queryRoom, searchRoomFn] = useUnit([$queryRoom, searchRoom]);

  return (
    <>
      <div className={styles.roomsListControls}>
        <Input
          value={queryRoom}
          onChange={(e) => searchRoomFn(e.target.value)}
          placeholder="Enter room name"
          size="small"
          prefix={<TeamOutlined />}
        />
        <Button icon={<PlusOutlined />} size="small" />
      </div>

      {roomsList.map((item) => (
        <RoomsListItem key={item.id} item={item} onClick={() => selectChatFn(item)} />
      ))}
    </>
  );
}
export const RoomsList = React.memo(NonMemoRoomsList);
