import { createEvent, createStore } from 'effector';
import { SegmentedProps } from 'antd';

const options: SegmentedProps['options'] = [
  {
    value: 'users',
    label: 'Users',
  },
  {
    value: 'rooms',
    label: 'Rooms',
  },
];

const changeChatType = createEvent<string>();
const $chatType = createStore('users').on(changeChatType, (_, value) => value);

export { changeChatType, $chatType, options };
