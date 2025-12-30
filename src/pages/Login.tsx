import { LoginForm } from '../components/auth/LoginForm';

export const Login = () => {
  return (
    <div className="login-background flex items-center justify-center min-h-screen p-6">
      <LoginForm />
    </div>
  );
};

export default Login;