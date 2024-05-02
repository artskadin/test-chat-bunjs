import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './app/CreateRouter';

// const fd = new FormData();
// fd.append('username', 'artem');
// fd.append('password', '123');
// fd.append('role', 'admin');

const reqData = {
  username: 'artem',
  password: 'pupa123',
  // role: 'admin',
};

// const testFetch = fetch('http://localhost:3000');
const testFetch = fetch(`http://localhost:3000/signout`, {
  method: 'POST',
  body: JSON.stringify(reqData),
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});
// const testFetch = fetch(`http://localhost:3000`);

// testFetch
//   .then((res) => {
//     console.log('then1', res);
//     return res.json();
//   })
//   .then((res) => {
//     console.log('then2', res);
//   })
//   .catch((err) => console.error(err));

const res = await testFetch;

if (res.status === 200) {
  console.log('pupa');
  console.log(await res.json());
} else {
  console.log('err');
  const err = await res.json();
  console.log(err);
}

const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
