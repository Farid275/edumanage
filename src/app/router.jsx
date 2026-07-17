import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';

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
    element: <Navigate to="/admin/dashboard" replace />
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> }
    ]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'admin/dashboard', element: <AdminDashboardPage /> },
      { path: 'lecturer/dashboard', element: <LecturerDashboardPage /> },
      { path: 'student/dashboard', element: <StudentDashboardPage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'students', element: <StudentsPage /> },
      { path: 'lecturers', element: <LecturersPage /> },
      { path: 'assignments', element: <AssignmentsPage /> },
      { path: 'attendance', element: <AttendancePage /> },
      { path: 'grades', element: <GradesPage /> },
      { path: 'materials', element: <MaterialsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  }
]);
