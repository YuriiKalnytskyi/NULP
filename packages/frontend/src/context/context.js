import { createContext } from 'react';

function noop() {}

export const Context = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  update: noop,
  isAuthenticated: false,
  ready: false
});
