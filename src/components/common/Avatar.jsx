import React from 'react';
import clsx from 'clsx';

const Avatar = ({ 
  src, 
  alt = 'User', 
  size = 'md', 
  online = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={clsx('relative', className)}>
      <img
        src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}`}
        alt={alt}
        className={clsx(
          sizeClasses[size],
          'rounded-full object-cover border-2 border-white shadow-sm'
        )}
      />
      {online !== null && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
            online ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
      )}
    </div>
  );
};

export default Avatar;