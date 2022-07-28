import { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/index';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const options = {
    headers: {
      accept: '*/*',
      'Cotent-type': 'application/json',
    },
  };

  const signIn = async (email, password) => {
    const { data: acces_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log(acces_token);

    if (acces_token) {
      Cookie.set('token', acces_token.acces_token, { expires: 5 });
    }
  };

  return { user, signIn };
}
