import React from 'react';
import { AnvilIcon } from '@/shared/icons/Anvil';
import { Typography, Button } from 'antd';

import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

const NonMemoHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <AnvilIcon />
          <Typography.Title className={styles.logoText} level={2} style={{ margin: 0 }}>
            Kovka chat
          </Typography.Title>
        </div>

        <div className={styles.loginControls}>
          <Button type="text" onClick={() => navigate('/logup')}>
            Log up
          </Button>
          <Button type="text" onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button type="text" onClick={() => navigate('/logout')}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(NonMemoHeader);
