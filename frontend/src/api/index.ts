import ky from 'ky';

export const customApi = ky.create({
  prefixUrl: process.env.BASE_BACK_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      },
    ],
    // beforeError: [
    //   (error) => {
    //     error.response.status === 401;
    //   },
    // ],
  },
});
