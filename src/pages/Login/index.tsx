import { FormEvent, useContext, useEffect, useState } from 'react';
import { Eye, EyeSlash, Info } from 'phosphor-react';

import { Button, Container, Content, FormGroup, PasswordContainer, ErrorContainer } from './styles';

import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function Login() {
  const { authenticated, handleLogin, passwordError } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggle() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    handleLogin({ email, password });

    setLoading(false);
  }

  useEffect(() => {
    if (email && password) {
      setIsFormCompleted(true);
    } else {
      setIsFormCompleted(false);
    }
  }, [email, password]);

  if (authenticated) {
    return <Navigate to='/home' />;
  }

  return (
    <Container>
      <Content>
        <div className='welcome'>
          <p>Bem-vindo(a) ao</p>
          <h1><b>WAITER</b>APP</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Seu e-mail de acesso'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='password'>Senha</label>
            <PasswordContainer>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Informe sua senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${passwordError ? 'error' : ''}`}
              />
              {showPassword ? <EyeSlash className='icon' size={18} onClick={toggle} /> : <Eye className='icon' size={18} onClick={toggle} />}
            </PasswordContainer>
            {passwordError && (
              <ErrorContainer>
                <Info size={18} /><span>Senha incorreta. Tente novamente</span>
              </ErrorContainer>
            )}
          </FormGroup>
          <Button type='submit' className={`${isFormCompleted ? 'active' : ''}`}>
            {loading ? 'Carregando...' : 'Fazer login'}
          </Button>
        </form>
      </Content>
    </Container>
  );
}
