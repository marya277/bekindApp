import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input, Loader } from '../ui';
import { loginSchema, type LoginFormData } from '../../schemas';

export const LoginForm = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  // Configuración de React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Valida cuando pierdes el foco
  });

  // Handler del submit - recibe datos ya validados
  const onSubmit = async (data: LoginFormData) => {
    clearError();
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error en login:', err);
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/logo.svg" alt="Be Kind Network" className="h-12 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Empieza a conectar tu comunidad ante buenas acciones!
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo Email */}
        <Input
          label="Correo Electrónico*"
          type="email"
          placeholder="Ingresar correo"
          disabled={isLoading}
          error={errors.username?.message}
          autoComplete="email"
          {...register('username')}
        />

        {/* Campo Contraseña */}
        <Input
          label="Contraseña*"
          type="password"
          placeholder="Ingresa tu contraseña"
          disabled={isLoading}
          error={errors.password?.message}
          autoComplete="current-password"
          {...register('password')}
        />

        {/* Error del servidor */}
        {error && (
          <div className="bg-status-error/10 border border-status-error rounded-input p-3">
            <p className="text-sm text-status-error font-medium text-center">
              {error}
            </p>
          </div>
        )}

        {/* Link recuperar contraseña */}
        <div className="text-center">
          <Link to="/forgot-password" className="text-sm text-brand-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón submit */}
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