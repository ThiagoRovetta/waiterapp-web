import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '../utils/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthParms {
	email: string;
	password: string;
}

type CurrentUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

interface AuthContextData {
	authenticated: boolean;
  currentUser: CurrentUser | null;
	handleLogin: (parms: AuthParms) => void;
	handleLogout: () => void;
  passwordError: boolean;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/home';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');

    if (token && user) {
      setAuthenticated(true);
      setCurrentUser(JSON.parse(user));

      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
    }
  }, []);

  async function handleLogin({ email, password }: AuthParms) {
    try {
      const response = await api.post('/auth', {
        email, password
      });

      setPasswordError(false);

      if (response) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));

        setAuthenticated(true);
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;

        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.log('error', error);

      if (error?.response?.status === 401) {
        setPasswordError(true);
      } else {
        setPasswordError(false);

        toast.error(`${error.message}`);
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    api.defaults.headers.authorization = null;

    setAuthenticated(false);
    setCurrentUser(null);

    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ authenticated, currentUser, handleLogin, handleLogout, passwordError, setPasswordError }}>
      {children}
    </AuthContext.Provider>
  );
}
