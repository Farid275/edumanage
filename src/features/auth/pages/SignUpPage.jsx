import { Link } from 'react-router';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AuthFormHeader } from '../components/AuthFormHeader';
import { PasswordInput } from '../components/PasswordInput';
import { AuthBrand } from '../components/AuthBrand';

export function SignUpPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-shell auth-shell--signup">
      <AuthBrand />
      <div className="auth-card">
        <AuthFormHeader 
          title="Student Registration" 
          subtitle="Create your account to access course materials and grades."
        />
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="fullName" className="font-label-md text-sm font-medium text-[var(--color-on-surface)] mb-1.5 block">
              Full Name
            </label>
            <Input 
              id="fullName"
              type="text" 
              icon="person"
              placeholder="John Doe"
              required 
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email" className="font-label-md text-sm font-medium text-[var(--color-on-surface)] mb-1.5 block">
              Email address
            </label>
            <Input 
              id="email"
              type="email" 
              icon="mail"
              placeholder="you@student.edu"
              required 
            />
          </div>

          <PasswordInput 
            id="password"
            label="Password"
            placeholder="Create a strong password"
            required
          />

          <PasswordInput 
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Repeat your password"
            required
          />

          <div className="auth-notice bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 mt-2 w-full">
            <p className="text-xs text-[var(--color-on-surface-variant)] flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[var(--color-primary)]">info</span>
              <span>Self-registration is strictly for Student accounts. Other roles will not be assigned.</span>
            </p>
          </div>

          <div className="auth-submit">
            <Button type="submit" className="w-full h-10">
              Create Account
            </Button>
          </div>
          
          <div className="text-center mt-4 w-full">
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
