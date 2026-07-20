import { BrandLogo } from '../../../components/brand/BrandLogo';

export function AuthBrand() {
  return (
    <div className="auth-brand mb-8 flex justify-center w-full">
      <BrandLogo 
        size="large" 
        layout="vertical" 
        subtitle="Academic Excellence Platform" 
      />
    </div>
  );
}
