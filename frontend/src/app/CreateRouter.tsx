import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { ChatInfo } from '@/widgets/chat-info';
import { Auth } from '@/pages/auth';

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Navigate to={'/chats'} replace={true} /> },
        { path: '/login', element: <Auth /> },
        { path: '/logup', element: <Auth /> },
        {
          path: 'chats',
          element: <ChatInfo />,
          children: [
            {
              path: ':id',
              element: <div>fs</div>,
              // loader: ({ params }) => {
              //   const { id: chatId } = params;
              //
              //   return null;
              // },
            },
          ],
        },
      ],
    },
  ]);
}
