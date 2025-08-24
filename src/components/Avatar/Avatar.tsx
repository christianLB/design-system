import * as React from 'react';
import { useTheme } from '../../theme/ThemeContext';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      shape = 'circle',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { activeTheme } = useTheme();
    
    const getFallbackInitial = () => {
      if (!alt) return;
      return alt.charAt(0).toUpperCase();
    };
    
    // CSS variables for theming
    const cssVars = {
      '--avatar-bg': src ? 'transparent' : 'var(--muted)',
      '--avatar-text': 'var(--muted-foreground)',
      '--avatar-border': 'var(--border)',
      '--avatar-size': size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '64px',
      '--avatar-radius': shape === 'circle' ? '50%' : 'var(--radius)',
    };

    const classes = [
      'avatar',
      `avatar--${size}`,
      `avatar--${shape}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} style={{ ...cssVars, ...style }} {...props}>
        {src ? (
          <img src={src} alt={alt || ''} className="avatar__image" />
        ) : (
          <div className="avatar__fallback">{getFallbackInitial()}</div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
