import { ChatsListItem } from '@/shared/types';
import { combine, createEvent, createStore } from 'effector';

const testData: Array<ChatsListItem> = [
  { id: '-1', name: 'Main', hasNewMessage: false },
  { id: '-2', name: 'Flood', hasNewMessage: false },
  { id: '-3', name: 'Find job', hasNewMessage: true },
  { id: '-4', name: 'work', hasNewMessage: true },
  { id: '-5', name: 'test', hasNewMessage: true },
];

export const $roomsList = createStore<Array<ChatsListItem>>(testData);
const selectRoom = createEvent<ChatsListItem>('selectRoom');
const resetRoom = createEvent('resetRoom');

const $selectedRoom = createStore<ChatsListItem | null>(null)
  .on(selectRoom, (_, room) => room)
  .reset(resetRoom);

const searchRoom = createEvent<string>('searchRoom');
const $queryRoom = createStore<string>('').on(searchRoom, (_, value) => value);

const $filteredRoomsList = combine($roomsList, $queryRoom, (rooms, query) =>
  query ? rooms.filter((item) => item.name.toLowerCase().includes(query)) : rooms,
);

export { $selectedRoom, selectRoom, resetRoom, $queryRoom, searchRoom, $filteredRoomsList };
