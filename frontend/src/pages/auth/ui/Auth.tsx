import { useLocation } from 'react-router-dom';
import { SignUp } from '@/widgets/sign-up';

import styles from './Auth.module.css';
import { SignIn } from '@/widgets/sign-in';

export function Auth() {
  const location = useLocation();
  const isLogupPage = location.pathname.includes('logup');

  return isLogupPage ? <SignUp className={styles.authContainer} /> : <SignIn className={styles.authContainer} />;
}
