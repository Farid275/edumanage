export function Select({ options, className = '', ...props }) {
  return (
    <select 
      className={`form-input-academic h-9 px-3 rounded-lg bg-[var(--color-surface)] text-body-md text-[var(--color-on-surface)] cursor-pointer ${className}`}
      {...props}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
