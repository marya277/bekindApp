import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Loader } from '../ui';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../schemas/';

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setSuccessMessage('');

    // Simulación de envío (no hay endpoint real)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setSuccessMessage(
        `Se ha enviado un enlace de recuperación a ${data.email}. Por favor, revisa tu correo.`
      );
      reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <img src="/logo.svg" alt="Be Kind Network" className="h-12 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="text-sm text-gray-600">
          Ingresa tu correo electrónico y te enviaremos instrucciones para recuperarla.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Correo Electrónico*"
          type="email"
          placeholder="tu@correo.com"
          disabled={isLoading}
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        {successMessage && (
          <div className="bg-status-success/10 border border-status-success rounded-input p-3">
            <p className="text-sm text-status-success font-medium text-center">
              {successMessage}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size="sm" className="border-white border-t-transparent" />
              <span className="ml-2">Enviando...</span>
            </>
          ) : (
            'Enviar enlace de recuperación'
          )}
        </button>

        <div className="text-center pt-2">
          <Link to="/login" className="text-sm text-brand-primary hover:underline">
            ← Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  );
  };