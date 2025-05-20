import type { ButtonProps } from './src';
import type { CardProps } from './src';
import type { InputProps } from './src';

// Just testing that the type imports work
const buttonProps: ButtonProps = { variant: 'default', children: 'Button' };
const cardProps: CardProps = { variant: 'default', children: 'Card' };
const inputProps: InputProps = { type: 'text' };

console.log('Type imports work!');
