export function Select({ options, children, className = '', ...props }) {
  return (
    <select 
      className={`form-input-academic w-full min-w-0 min-h-[44px] px-3 rounded-lg bg-[var(--color-surface)] text-body-md text-[var(--color-on-surface)] cursor-pointer ${className}`}
      {...props}
    >
      {children || (options && options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      )))}
    </select>
  );
}
