import { LoginForm } from '../components/auth/LoginForm';

export const Login = () => {
  return (
    <div className="login-background min-h-screen flex items-center justify-center p-6">
      <LoginForm />
    </div>
  );
};

export default Login;