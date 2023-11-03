import { AuthModel } from '../context/AuthContext';
import { decode } from 'base-64';

export const extractJwt = (jwt: string): AuthModel => {
  const payload = JSON.parse(decode(jwt.split('.')[1]));

  return {
    userId: payload.userId,
    token: jwt,
  };
};
