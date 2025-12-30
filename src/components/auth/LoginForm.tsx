import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input, Loader } from '../ui';

export const LoginForm = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const validateUsername = (username: string): string | undefined => {
    if (!username) {
      return 'El correo electrónico es obligatorio';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      return 'Ingresa un correo electrónico válido';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'La contraseña es obligatoria';
    }
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    return !usernameError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      await login({ username, password }); 
      navigate('/dashboard');
    } catch (err) {
      console.error('Error en login:', err);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors({ ...errors, username: undefined });
    }
    clearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
    clearError();
  };

  return (
    <div className="bg-white rounded-card shadow-card p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/logo.svg" alt="Be Kind Network" className="h-12 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Empieza a conectar tu comunidad ante buenas acciones!
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo Electrónico*"
          type="email"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Ingresar correo"
          disabled={isLoading}
          error={errors.username}
          autoComplete="email"
        />

        <Input
          label="Contraseña*"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Ingresa tu contraseña"
          disabled={isLoading}
          error={errors.password}
          autoComplete="current-password"
        />

        {error && (
          <div className="bg-status-error/10 border border-status-error rounded-input p-3">
            <p className="text-sm text-status-error font-medium text-center">
              {error}
            </p>
          </div>
        )}

        <div className="text-center">
          <a href="#" className="text-sm text-brand-primary hover:underline">
            Recuperar contraseña
          </a>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size="sm" className="border-white border-t-transparent" />
              <span className="ml-2">Iniciando sesión...</span>
            </>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>
    </div>
  );
};
