import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Layout } from '@/shared/ui/Layout';
import { ChatsList } from '@/widgets/chats-list/ui';
import { useCheckAuth } from '@/features/check-auth/model';
import { useEffect } from 'react';

import styles from './App.module.css';

function App() {
  const { checkAuthFn } = useCheckAuth();

  useEffect(() => {
    checkAuthFn();
  }, []);
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Layout>
          <ChatsList />
          <Outlet />
        </Layout>
      </main>
    </>
  );
}

export default App;
