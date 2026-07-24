import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function RoleRoute({ allowedRoles = [] }) {
  const { user, role, loading, profileError } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profileError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] text-[var(--color-error)]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[48px]">error</span>
          <p className="font-title-md">{profileError}</p>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (role === 'lecturer') return <Navigate to="/lecturer/dashboard" replace />;
  if (role === 'student') return <Navigate to="/student/dashboard" replace />;

  return <Navigate to="/login" replace />;
}
