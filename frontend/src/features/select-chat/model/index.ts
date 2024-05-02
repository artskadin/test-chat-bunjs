import { createEvent, createStore, sample } from 'effector';
import { ChatsListItem } from '@/shared/types';
import { useUnit } from 'effector-react';
import { $usersList } from '@/entities/users-list/model';
import { $roomsList } from '@/entities/rooms-list/model';

const selectChat = createEvent<ChatsListItem>('selectChat');
const selectChatById = createEvent<string>('selectChatById');
const $selectedChat = createStore<ChatsListItem | null>(null).on(selectChat, (_, chat) => chat);

sample({
  clock: selectChatById,
  source: [$usersList, $roomsList],
  fn: (a, b) => {
    console.log({ a, b });
  },
  // target: $selectedChat,
});

function useSelectedChat() {
  const {
    $selectedChat: selectedChat,
    selectChat: selectChatFn,
    selectChatById: selectChatByIdFn,
  } = useUnit({ $selectedChat, selectChat, selectChatById });

  return { selectedChat, selectChatFn, selectChatByIdFn };
}

export { useSelectedChat };
