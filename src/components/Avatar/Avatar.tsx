import * as React from 'react';

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
      ...props
    },
    ref
  ) => {
    const getFallbackInitial = () => {
      if (!alt) return;
      return alt.charAt(0).toUpperCase();
    };

    const classes = [
      'avatar',
      `avatar--${size}`,
      `avatar--${shape}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
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
