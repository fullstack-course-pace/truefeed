import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className = '', noPadding = false }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-md',
        !noPadding && 'p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;