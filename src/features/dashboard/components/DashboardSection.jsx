export function DashboardSection({ children, className = '' }) {
  return (
    <section className={`mb-10 ${className}`}>
      {children}
    </section>
  );
}
