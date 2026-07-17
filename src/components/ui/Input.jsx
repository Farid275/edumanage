export function Input({ icon, className = '', wrapperClassName = '', ...props }) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-outline)]">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
      )}
      <input 
        className={`form-input-academic w-full h-9 ${icon ? 'pl-9' : 'pl-4'} pr-4 rounded-lg bg-[var(--color-surface)] text-body-md text-[var(--color-on-surface)] placeholder-[var(--color-outline)] ${className}`}
        {...props}
      />
    </div>
  );
}
