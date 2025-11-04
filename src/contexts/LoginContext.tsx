import axios from 'axios';
import { createContext, useState } from 'react';

export type LoginContextType = {
  isLoggedIn: boolean;
  pageRedirectAfterLogin: string;
  token: string;
  login: (email: string, password: string) => Promise<boolean>;
  setPageRedirectAfterLogin: (path: string) => void;
  logout: () => void;
  restoreLogin: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  pageRedirectAfterLogin: '/',
  token: '',
  login: () => new Promise<boolean>(() => false),
  setPageRedirectAfterLogin: () => {},
  logout: () => {},
  restoreLogin: () => {},
});

export default function LoginProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [pageRedirectAfterLogin, setPageRedirectAfterLogin] = useState('/');

  async function login(email: string, password: string) {
    return axios
      .post(
        'https://auteursapi-f0h4cgfxg9ceauh3.canadacentral-01.azurewebsites.net/api/utilisateurs/generatetoken',
        {
          email,
          password,
        },
      )
      .then((response) => {
        const { token } = response.data;
        if (token) {
          setIsLoggedIn(true);
          setToken(token);
          setTokenToCookies(token);
          return true;
        } else {
          setIsLoggedIn(false);
          setToken('');
          return false;
        }
      });
  }

  function getTokenFromCookies() {
    const match = document.cookie.match(/(^|;\s*)token=([^;]*)/);
    return match ? match[2] : null;
  }

  function setTokenToCookies(token: string) {
    document.cookie = `token=${token}; path=/; max-age=3600`; // 1 hour
  }

  function deleteTokenFromCookies() {
    document.cookie = 'token=; path=/; max-age=0';
  }

  function restoreLogin() {
    const token = getTokenFromCookies();
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    }
  }

  function logout() {
    setToken('');
    setIsLoggedIn(false);
    deleteTokenFromCookies();
  }

  const values = {
    isLoggedIn,
    token,
    login,
    logout,
    restoreLogin,
    pageRedirectAfterLogin,
    setPageRedirectAfterLogin,
  };

  return (
    <LoginContext.Provider value={values}>
      {props.children}
    </LoginContext.Provider>
  );
}
