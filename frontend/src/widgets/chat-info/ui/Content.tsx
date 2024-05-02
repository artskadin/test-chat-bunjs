import React from 'react';
import { Header } from './Header';
import { ChatMessage } from '@/entities/chat-message';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import styles from './ChatInfo.module.css';

// type User = {
//   id: string;
// };
//
// type Room = {
//   id: string;
// };

export type Message = {
  id: string;
  from: string;
  to: string;
  timestamp: Date;
  text: string;
};

const testMessages: Array<Message> = [
  { id: '1', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Hello, man' },
  { id: '2', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Пишу тебе в крутом чате' },
  { id: '3', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Обгонит телеграм' },
  {
    id: '4',
    from: 'lupa',
    to: 'pupa',
    timestamp: new Date(),
    text: 'Длинная строка, проверим, как будет смотреться, лупа пупа. Мы всегда были за культурную составляющую, поэтому долго взращивали мысль перенести наше творчество на бумагу.',
  },
  { id: '5', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'Hey, pupa. Как дела?' },
  {
    id: '6',
    from: 'lupa',
    to: 'pupa',
    timestamp: new Date(),
    text: 'Пойдет. Как продвигается работа над чатом??',
  },
  {
    id: '7',
    from: 'pupa',
    to: 'lupa',
    timestamp: new Date(),
    text: 'Непросто. Вылезло много нюансов, с которыми я не работал. Сейчас решаю эти проблемы и мощно прокачиваюсь!',
  },
  { id: '8', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Давай не опускай руки бро' },
  { id: '9', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'Грамотно' },
  { id: '10', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'Пойду дальше готовить проект' },
  { id: '11', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'Но и про работу не буду забывать!' },
  { id: '12', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Когда думаешь закончить' },
  { id: '13', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },

  { id: '14', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '15', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '16', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '17', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '18', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '19', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '20', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '21', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '22', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '23', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '24', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '25', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '26', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '27', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '28', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '29', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '30', from: 'pupa', to: 'lupa', timestamp: new Date(), text: 'К концу янвваря' },
  { id: '31', from: 'lupa', to: 'pupa', timestamp: new Date(), text: 'Сомнительно, но окэй' },
];

function NonMemoContent() {
  const currentUser = 'pupa';

  return (
    <div className={styles.chatContent}>
      <Header />

      <div className={styles.chatMessagesListWrapper}>
        <div className={styles.chatMessagesList}>
          {testMessages.map((message) => (
            <ChatMessage key={message.id} message={message} isSender={message.from === currentUser} />
          ))}
        </div>
      </div>

      <div className={styles.chatMessagesInput}>
        <Input.TextArea
          className={'pupa'}
          placeholder={'Enter your text'}
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
        <div style={{ fill: '#faa10833' }}>
          <SendOutlined style={{ fill: 'currentcolor' }} />
        </div>
      </div>
    </div>
  );
}

export const Content = React.memo(NonMemoContent);
