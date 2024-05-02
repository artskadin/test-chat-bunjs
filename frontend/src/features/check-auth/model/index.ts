import { createEffect, createEvent, createStore, sample } from 'effector';
import ky from 'ky';
import { BASE_URL } from '@/api';
import { User } from '@/shared/types';
import { useUnit } from 'effector-react';

const chechAuthFx = createEffect<void, User>({
  name: 'check auth fx',
  async handler() {
    const res: any = await ky.get(`${BASE_URL}/refresh`, { credentials: 'include' }).json();

    console.log(res);

    return res;
  },
});

const checkAuth = createEvent('checkAuthFn');

checkAuth.watch(() => console.log('checkAuth event'));

const $isAuth = createStore<Boolean>(false);
const $currentUser = createStore<User | null>(null);

sample({
  clock: checkAuth,
  target: chechAuthFx,
});

const tar = sample({
  source: chechAuthFx.doneData,
  target: $currentUser,
});

tar.watch((res) => console.log('sample', res));

function useCheckAuth() {
  const {
    $isAuth: isAuth,
    $currentUser: currentUser,
    checkAuth: checkAuthFn,
  } = useUnit({ $isAuth, $currentUser, checkAuth });

  return { isAuth, currentUser, checkAuthFn };
}

export { useCheckAuth };
