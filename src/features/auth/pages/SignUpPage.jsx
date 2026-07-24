import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AuthFormHeader } from '../components/AuthFormHeader';
import { PasswordInput } from '../components/PasswordInput';
import { AuthBrand } from '../components/AuthBrand';
import { useAuth } from '../context/AuthContext';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUpStudent } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signUpStudent(
        formData.email,
        formData.password,
        formData.fullName
      );
      
      if (error) {
        setFormError(error.message);
      } else if (data?.user && !data?.session) {
        // Email confirmation required
        setSuccessMsg('Registration successful! Please check your email to confirm your account.');
      } else if (data?.session) {
        // If auto-login happens and no email confirmation required
        // PublicOnlyRoute will handle routing
      }
    } finally {
      setIsSubmitting(false);
    }
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
          {formError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
              {formError}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm mb-4 border border-green-200">
              {successMsg}
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="fullName" className="font-label-md text-sm font-medium text-[var(--color-on-surface)] mb-1.5 block">
              Full Name
            </label>
            <Input 
              id="fullName"
              type="text" 
              icon="person"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required 
              disabled={isSubmitting}
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
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={isSubmitting}
            />
          </div>

          <PasswordInput 
            id="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />

          <PasswordInput 
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />

          <div className="auth-notice bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 mt-2 w-full">
            <p className="text-xs text-[var(--color-on-surface-variant)] flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[var(--color-primary)]">info</span>
              <span>Self-registration is strictly for Student accounts. Other roles will not be assigned.</span>
            </p>
          </div>

          <div className="auth-submit">
            <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
