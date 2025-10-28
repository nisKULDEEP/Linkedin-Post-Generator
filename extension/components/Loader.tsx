import React from 'react';
import { PencilIcon } from './icons/PencilIcon';

interface LoaderProps {
    isScraping?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isScraping }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8 text-center">
      <div className="relative w-16 h-16">
        <PencilIcon className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-amber-500" />
        <svg className="w-16 h-16 animate-spin" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#333" strokeWidth="4" fill="none" strokeDasharray="180" />
        </svg>
      </div>
      <p className="mt-4 text-xl font-bold text-black">
        {isScraping ? 'Analyzing recent posts...' : 'Drafting your masterpiece...'}
      </p>
      <p className="text-gray-600 text-sm">The AI is working its magic!</p>
    </div>
  );
};

export default Loader;
