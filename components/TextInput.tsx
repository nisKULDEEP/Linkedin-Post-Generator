import React from 'react';

interface TextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextInput: React.FC<TextInputProps> = ({ className = '', ...props }) => {
  const baseClasses = "w-full p-3 text-base bg-white border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-[4px_4px_0px_#000]";

  return (
    <textarea
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};

export default TextInput;