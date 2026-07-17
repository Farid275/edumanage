import { ROLES } from './roles';

export const NAVIGATION = {
  [ROLES.ADMIN]: [
    { id: 'admin-dashboard', path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'students', path: '/students', icon: 'group', label: 'Students' },
    { id: 'courses', path: '/courses', icon: 'school', label: 'Courses' },
    { id: 'lecturers', path: '/lecturers', icon: 'person', label: 'Lecturers' },
    { id: 'reports', path: '/reports', icon: 'assessment', label: 'Reports' },
    { id: 'settings', path: '/settings', icon: 'settings', label: 'Settings' }
  ],
  [ROLES.LECTURER]: [
    { id: 'lecturer-dashboard', path: '/lecturer/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'courses', path: '/courses', icon: 'school', label: 'Courses' },
    { id: 'assignments', path: '/assignments', icon: 'assignment', label: 'Assignments' },
    { id: 'attendance', path: '/attendance', icon: 'event_available', label: 'Attendance' },
    { id: 'grades', path: '/grades', icon: 'analytics', label: 'Grades' },
    { id: 'materials', path: '/materials', icon: 'menu_book', label: 'Materials' },
    { id: 'settings', path: '/settings', icon: 'settings', label: 'Settings' }
  ],
  [ROLES.STUDENT]: [
    { id: 'student-dashboard', path: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'courses', path: '/courses', icon: 'school', label: 'Courses' },
    { id: 'assignments', path: '/assignments', icon: 'assignment', label: 'Assignments' },
    { id: 'grades', path: '/grades', icon: 'analytics', label: 'Grades' },
    { id: 'materials', path: '/materials', icon: 'menu_book', label: 'Materials' },
    { id: 'settings', path: '/settings', icon: 'settings', label: 'Settings' }
  ]
};
