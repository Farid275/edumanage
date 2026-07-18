import { useState } from 'react';
import { Input } from '../../../components/ui/Input';

export function PasswordInput({ label, id, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-field">
      {label && (
        <label htmlFor={id} className="font-label-md text-sm font-medium text-[var(--color-on-surface)] mb-1.5 block">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <Input 
          id={id}
          type={showPassword ? 'text' : 'password'}
          icon="lock"
          className="pr-10 w-full"
          wrapperClassName="w-full"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[var(--color-outline)] hover:text-[var(--color-on-surface)] transition-colors"
          tabIndex="-1"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>
    </div>
  );
}
