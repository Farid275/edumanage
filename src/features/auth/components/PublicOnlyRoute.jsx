import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function PublicOnlyRoute() {
  const { user, role, loading, profileError } = useAuth();

  if (loading) {
    return <LoadingState message="Checking authentication session..." />;
  }

  if (!user) {
    return <Outlet />;
  }

  if (profileError) {
    return <ErrorState message={profileError} />;
  }

  if (!role) {
    return <LoadingState message="Loading account profile..." />;
  }

  const dashboardForRole = (r) => {
    if (r === 'admin') return '/admin/dashboard';
    if (r === 'lecturer') return '/lecturer/dashboard';
    return '/student/dashboard';
  };
  
  return <Navigate to={dashboardForRole(role)} replace />;
}
