import { Link } from 'react-router';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AuthFormHeader } from '../components/AuthFormHeader';
import { PasswordInput } from '../components/PasswordInput';
import { AuthBrand } from '../components/AuthBrand';

export function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-shell auth-shell--login">
      <AuthBrand />
      <div className="auth-card">
        <AuthFormHeader 
          title="Sign In" 
          subtitle="Welcome back to your academic portal."
        />
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email" className="font-label-md text-sm font-medium text-[var(--color-on-surface)] mb-1.5 block">
              Email address
            </label>
            <Input 
              id="email"
              type="email" 
              icon="mail"
              placeholder="you@university.edu"
              required 
            />
          </div>

          <PasswordInput 
            id="password"
            label="Password"
            placeholder="••••••••"
            required
          />

          <div className="auth-options text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-[var(--color-on-surface-variant)] group">
              <input type="checkbox" className="rounded border-[var(--color-outline-variant)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
              <span className="group-hover:text-[var(--color-on-surface)] transition-colors">Remember me</span>
            </label>
            <a href="#" className="font-medium text-[var(--color-primary)] hover:underline text-left sm:text-right">
              Forgot password?
            </a>
          </div>

          <div className="auth-submit">
            <Button type="submit" className="w-full h-10">
              Sign In
            </Button>
          </div>
          
          <div className="text-center mt-4 w-full">
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-3">
              Are you a new student?{' '}
              <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:underline">
                Register here
              </Link>
            </p>
            <div className="bg-[var(--color-surface-container)]/50 p-3 rounded-md w-full">
              <p className="text-xs text-[var(--color-outline)]">
                Note: Admin and Lecturer accounts must be created by the system administrator.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
