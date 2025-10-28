import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const colorClasses = {
    primary: 'bg-amber-400 hover:bg-amber-500',
    secondary: 'bg-cyan-400 hover:bg-cyan-500',
  };

  const baseClasses = "w-full inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-black border-2 border-black rounded-md shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-[4px_4px_0px_#999] disabled:bg-gray-300";

  return (
    <button
      className={`${baseClasses} ${colorClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;