import { EmptyState } from '../../../components/feedback/EmptyState';

export function AttendanceEmptyState({ message = 'Select a course and session to manage attendance.', detail = 'Attendance records will appear after a course session is selected.' }) {
  return (
    <EmptyState
      icon="fact_check"
      title={message}
      description={detail}
      className="border-none"
    />
  );
}
