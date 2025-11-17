import React from 'react';
import clsx from 'clsx';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-purple-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;