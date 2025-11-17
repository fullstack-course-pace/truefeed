import React, { useState, useEffect } from 'react';

const FallingText = ({ text, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <span className={`inline-flex justify-center ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default FallingText;