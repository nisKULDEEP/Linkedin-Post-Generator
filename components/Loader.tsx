import React from 'react';
import { PencilIcon } from './icons/PencilIcon';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 text-center">
      <div className="relative w-20 h-20">
        <PencilIcon className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-amber-500" />
        <svg className="w-20 h-20 animate-spin" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#333" strokeWidth="4" fill="none" strokeDasharray="180" />
        </svg>
      </div>
      <p className="mt-4 text-2xl font-bold text-black">
        Drafting your masterpiece...
      </p>
      <p className="text-gray-600">The AI is working its magic!</p>
    </div>
  );
};

export default Loader;