export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-6 py-2 rounded-lg font-label-md transition-colors shadow-sm flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-[var(--color-academic-navy)] hover:bg-[var(--color-deep-navy)] text-white",
    secondary: "bg-transparent border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)]",
    ghost: "bg-transparent hover:bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] shadow-none",
  };
  return (
    <button className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
