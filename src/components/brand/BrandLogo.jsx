import edumanageLogo from '../../assets/brand/edumanage-logo.png';

export function BrandLogo({ 
  variant = 'default',
  size = 'medium', 
  showText = true, 
  subtitle,
  layout = 'horizontal',
  theme = 'light',
  className = ''
}) {
  const sizeClasses = {
    compact: 'w-[36px] h-[36px]',
    small: 'w-[42px] h-[42px]',
    medium: 'w-[48px] h-[48px]',
    large: 'w-[80px] h-[80px]'
  };

  const titleSizes = {
    compact: 'text-lg',
    small: 'text-[22px]',
    medium: 'text-2xl',
    large: 'text-[28px]'
  };

  const titleColor = theme === 'dark' ? 'text-white' : 'text-[var(--color-on-surface)]';
  const subtitleColor = theme === 'dark' ? 'text-white/70' : 'text-[var(--color-on-surface-variant)]';

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center text-center gap-4' : 'items-center gap-3'} min-w-0 ${className}`}>
      <img 
        src={edumanageLogo} 
        alt="EduManage Logo" 
        className={`${sizeClasses[size] || sizeClasses.medium} object-contain shrink-0`}
      />
      
      {showText && (
        <div className="flex flex-col min-w-0 justify-center">
          <span className={`font-headline-md font-bold leading-tight tracking-tight truncate ${titleColor} ${titleSizes[size] || titleSizes.medium}`}>
            EduManage
          </span>
          {subtitle && (
            <span className={`font-body-md truncate mt-0.5 ${subtitleColor}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
