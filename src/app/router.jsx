import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { RoleRoute } from '../features/auth/components/RoleRoute';
import { PublicOnlyRoute } from '../features/auth/components/PublicOnlyRoute';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignUpPage } from '../features/auth/pages/SignUpPage';

import { AdminDashboardPage } from '../features/dashboard/pages/AdminDashboardPage';
import { LecturerDashboardPage } from '../features/dashboard/pages/LecturerDashboardPage';
import { StudentDashboardPage } from '../features/dashboard/pages/StudentDashboardPage';

import { CoursesPage } from '../features/courses/pages/CoursesPage';
import { StudentsPage } from '../features/students/pages/StudentsPage';
import { LecturersPage } from '../features/lecturers/pages/LecturersPage';
import { AssignmentsPage } from '../features/assignments/pages/AssignmentsPage';
import { AttendancePage } from '../features/attendance/pages/AttendancePage';
import { GradesPage } from '../features/grades/pages/GradesPage';
import { MaterialsPage } from '../features/materials/pages/MaterialsPage';
import { ReportsPage } from '../features/reports/pages/ReportsPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignUpPage /> }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            element: <RoleRoute allowedRoles={['admin']} />,
            children: [
              { path: 'admin/dashboard', element: <AdminDashboardPage /> },
              { path: 'lecturers', element: <LecturersPage /> }
            ]
          },
          {
            element: <RoleRoute allowedRoles={['lecturer']} />,
            children: [
              { path: 'lecturer/dashboard', element: <LecturerDashboardPage /> }
            ]
          },
          {
            element: <RoleRoute allowedRoles={['student']} />,
            children: [
              { path: 'student/dashboard', element: <StudentDashboardPage /> }
            ]
          },
          {
            element: <RoleRoute allowedRoles={['admin', 'lecturer']} />,
            children: [
              { path: 'students', element: <StudentsPage /> },
              { path: 'reports', element: <ReportsPage /> }
            ]
          },
          {
            element: <RoleRoute allowedRoles={['lecturer', 'student']} />,
            children: [
              { path: 'assignments', element: <AssignmentsPage /> },
              { path: 'attendance', element: <AttendancePage /> },
              { path: 'grades', element: <GradesPage /> },
              { path: 'materials', element: <MaterialsPage /> }
            ]
          },
          {
            element: <RoleRoute allowedRoles={['admin', 'lecturer', 'student']} />,
            children: [
              { path: 'courses', element: <CoursesPage /> },
              { path: 'settings', element: <SettingsPage /> }
            ]
          }
        ]
      }
    ]
  }
]);
