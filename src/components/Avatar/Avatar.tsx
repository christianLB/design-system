import * as React from 'react';
import { cn } from '../../utils';

/**
 * Size variants for the Avatar component
 */
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Shape variants for the Avatar component
 */
type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The source URL for the avatar image
   */
  src?: string;
  /**
   * Alternative text for the avatar image, also used for the fallback initial
   */
  alt?: string;
  /**
   * The size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * The shape of the avatar
   * @default 'circle'
   */
  shape?: AvatarShape;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-lg',
};

const shapeClasses: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

/**
 * Avatar component displays a user's profile picture or their initials as a fallback.
 * 
 * @component
 * @example
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 * 
 * // With custom size and shape
 * <Avatar size="lg" shape="square" alt="Jane Smith" />
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((
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

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden flex items-center justify-center',
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground font-medium">
          {getFallbackInitial()}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export { Avatar };
