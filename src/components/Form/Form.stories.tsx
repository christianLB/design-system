import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormField, FormActions } from './Form';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import {
  useFormValidation,
  createValidationRules,
  combineRules,
} from '../../hooks/useFormValidation';

const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const BasicLogin: Story = {
  render: () => {
    const form = useFormValidation<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
      console.log('Form submitted:', data);
      alert(`Login: ${data.email}`);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="max-w-md">
        <FormField<LoginFormData> name="email" label="Email" required>
          <Input
            type="email"
            placeholder="Enter your email"
            {...form.register(
              'email',
              combineRules(createValidationRules.required(), createValidationRules.email()),
            )}
          />
        </FormField>

        <FormField<LoginFormData> name="password" label="Password" required>
          <Input
            type="password"
            placeholder="Enter your password"
            {...form.register(
              'password',
              combineRules(createValidationRules.required(), createValidationRules.minLength(8)),
            )}
          />
        </FormField>

        <FormActions>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Login</Button>
        </FormActions>
      </Form>
    );
  },
};

export const WithValidationSummary: Story = {
  render: () => {
    const form = useFormValidation<SignupFormData>();

    const onSubmit = (data: SignupFormData) => {
      console.log('Form submitted:', data);
    };

    return (
      <Form form={form} onSubmit={onSubmit} showValidationSummary className="max-w-md">
        <FormField<SignupFormData> name="name" label="Full Name" required>
          <Input
            placeholder="John Doe"
            {...form.register('name', createValidationRules.required('Name is required'))}
          />
        </FormField>

        <FormField<SignupFormData> name="email" label="Email" required>
          <Input
            type="email"
            placeholder="john@example.com"
            {...form.register(
              'email',
              combineRules(
                createValidationRules.required('Email is required'),
                createValidationRules.email('Please enter a valid email'),
              ),
            )}
          />
        </FormField>

        <FormField<SignupFormData>
          name="password"
          label="Password"
          required
          hint="At least 8 characters"
        >
          <Input
            type="password"
            placeholder="••••••••"
            {...form.register(
              'password',
              combineRules(
                createValidationRules.required('Password is required'),
                createValidationRules.minLength(8, 'Password must be at least 8 characters'),
              ),
            )}
          />
        </FormField>

        <FormField<SignupFormData> name="confirmPassword" label="Confirm Password" required>
          <Input
            type="password"
            placeholder="••••••••"
            {...form.register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === form.getValues('password') || 'Passwords do not match',
            })}
          />
        </FormField>

        <FormActions>
          <Button type="submit">Create Account</Button>
        </FormActions>
      </Form>
    );
  },
};

export const HorizontalLayout: Story = {
  render: () => {
    const form = useFormValidation<LoginFormData>();

    return (
      <Form form={form} onSubmit={console.log} layout="horizontal" className="max-w-lg">
        <FormField<LoginFormData> name="email" label="Email" layout="horizontal" required>
          <Input
            type="email"
            placeholder="Enter your email"
            {...form.register('email', createValidationRules.required())}
          />
        </FormField>

        <FormField<LoginFormData> name="password" label="Password" layout="horizontal" required>
          <Input
            type="password"
            placeholder="Enter your password"
            {...form.register('password', createValidationRules.required())}
          />
        </FormField>

        <FormActions align="right">
          <Button type="submit">Login</Button>
        </FormActions>
      </Form>
    );
  },
};

export const InlineLayout: Story = {
  render: () => {
    const form = useFormValidation<{ search: string }>();

    return (
      <Form form={form} onSubmit={console.log} layout="inline">
        <Input placeholder="Search..." {...form.register('search')} className="w-64" />
        <Button type="submit">Search</Button>
      </Form>
    );
  },
};

export const WithSuccessMessage: Story = {
  render: () => {
    const form = useFormValidation<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Submitted:', data);
    };

    return (
      <Form
        form={form}
        onSubmit={onSubmit}
        showSuccessMessage
        successMessage="Login successful! Redirecting..."
        className="max-w-md"
      >
        <FormField<LoginFormData> name="email" label="Email">
          <Input type="email" placeholder="Enter your email" {...form.register('email')} />
        </FormField>

        <FormField<LoginFormData> name="password" label="Password">
          <Input type="password" placeholder="Enter your password" {...form.register('password')} />
        </FormField>

        <FormActions>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </FormActions>
      </Form>
    );
  },
};
