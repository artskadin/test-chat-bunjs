import { combine, createEvent, createStore } from 'effector';
import { ChatsListItem } from '@/shared/types';
import { useUnit } from 'effector-react';

const testData: Array<ChatsListItem> = [
  { id: '1', name: 'Pupa', hasNewMessage: true },
  { id: '2', name: 'Lupa', hasNewMessage: false },
  { id: '3', name: 'Nietzsche', hasNewMessage: false },
  { id: '4', name: 'Mozart', hasNewMessage: false },
  { id: '5', name: 'Goethe', hasNewMessage: false },
  { id: '6', name: 'Schopenhauer', hasNewMessage: true },
  { id: '7', name: 'Turgenev', hasNewMessage: false },
  { id: '8', name: 'Aristotle', hasNewMessage: false },
];

export const $usersList = createStore<Array<ChatsListItem>>(testData);

const searchUser = createEvent<string>('searchUser');
const $queryUser = createStore<string>('').on(searchUser, (_, value) => value);
function useQueryUser() {
  const { $queryUser: queryUser, searchUser: searchUserFn } = useUnit({ $queryUser, searchUser });

  return { queryUser, searchUserFn };
}

const $filteredUsersList = combine($usersList, $queryUser, (users, query) =>
  query ? users.filter((item) => item.name.toLowerCase().includes(query)) : users,
);
function useUsersList() {
  const { $usersList: usersList, $filteredUsersList: filteredUsersList } = useUnit({ $usersList, $filteredUsersList });

  return { usersList, filteredUsersList };
}

export { useUsersList, useQueryUser };
