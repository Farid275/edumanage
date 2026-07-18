export function MaterialTypeIcon({ type, className = '' }) {
  const getIconData = (type) => {
    switch (type) {
      case 'document':
        return { icon: 'description', color: 'text-[var(--color-primary)]' };
      case 'slide':
        return { icon: 'slideshow', color: 'text-[var(--color-tertiary)]' };
      case 'video':
        return { icon: 'smart_display', color: 'text-[var(--color-error)]' };
      case 'link':
        return { icon: 'link', color: 'text-[var(--color-secondary)]' };
      default:
        return { icon: 'draft', color: 'text-[var(--color-outline)]' };
    }
  };

  const { icon, color } = getIconData(type);

  return (
    <span className={`material-symbols-outlined text-[18px] ${color} ${className}`} aria-hidden="true">
      {icon}
    </span>
  );
}
