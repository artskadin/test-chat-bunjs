import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { UsersListItem } from '@/entities/users-list/ui/UsersListItem';
import { UserOutlined } from '@ant-design/icons';
import { useQueryUser, useUsersList } from '@/entities/users-list/model';
import { useSelectedChat } from '@/features/select-chat';

function NonMemoUsersList() {
  const { filteredUsersList } = useUsersList();
  const { selectChatFn } = useSelectedChat();
  const { queryUser, searchUserFn } = useQueryUser();

  const navigate = useNavigate();

  return (
    <>
      <Input
        value={queryUser}
        onChange={(e) => searchUserFn(e.target.value)}
        placeholder="Enter user name"
        size="small"
        prefix={<UserOutlined />}
      />

      {filteredUsersList.map((item) => (
        <UsersListItem
          key={item.id}
          item={item}
          onClick={() => {
            selectChatFn(item);
            navigate(`/chats/${item.id}`);
          }}
        />
      ))}
    </>
  );
}

export const UsersList = React.memo(NonMemoUsersList);
