import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="login-background flex items-center justify-center min-h-screen p-4">
      {/* Elipses decorativas */}
      <div className="login-ellipse-blue"></div>
      <div className="login-ellipse-yellow"></div>
      
      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;