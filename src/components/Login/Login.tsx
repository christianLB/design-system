import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card/Card';
import { Divider } from '../Divider/Divider';
import { TextField } from '../TextField';
import Button from '../Button/Button';

export interface LoginProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Simple login form with email and password fields.
 */
export const Login = React.forwardRef<HTMLFormElement, LoginProps>(
  ({ onSubmit, className, ...props }, ref) => (
    <Card className={`w-64 ${className ?? ''}`.trim()}>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <Divider />
      <CardContent>
        <form
          ref={ref}
          className="flex flex-col gap-[var(--spacing-md)]"
          onSubmit={onSubmit}
          {...props}
        >
          <TextField id="email" label="Email" type="email" required />
          <TextField id="password" label="Password" type="password" required />
          <Divider />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
);

Login.displayName = 'Login';

export default Login;
