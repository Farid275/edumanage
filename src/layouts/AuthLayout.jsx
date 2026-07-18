import { Outlet } from 'react-router';
import '../features/auth/auth.css';

export function AuthLayout() {
  return (
    <div className="auth-page">
      <Outlet />
    </div>
  );
}
