import React from 'react';
import { TextField } from '../TextField';
import Button from '../Button/Button';

export interface LoginProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Simple login form with email and password fields.
 */
export const Login = React.forwardRef<HTMLFormElement, LoginProps>(
  ({ onSubmit, className, ...props }, ref) => {
    return (
      <form ref={ref} className={className} onSubmit={onSubmit} {...props}>
        <div className="flex flex-col gap-[var(--spacing-md)] w-64">
          <TextField id="email" label="Email" type="email" required />
          <TextField id="password" label="Password" type="password" required />
          <Button type="submit">Login</Button>
        </div>
      </form>
    );
  }
);

Login.displayName = 'Login';

export default Login;
