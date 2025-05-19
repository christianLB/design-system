import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  shape = 'circle',
  className,
  ...props
}) => {
  const sizeClass = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }[size];

  const shapeClass = {
    circle: 'rounded-full',
    square: 'rounded-md',
  }[shape];

  return (
    <div
      className={`overflow-hidden flex items-center justify-center ${sizeClass} ${shapeClass} ${className || ''}`}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <div className="bg-gray-300 w-full h-full flex items-center justify-center">
          {alt && alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;