import React from 'react';
import Button from './Button';

interface HeaderProps {
  onClearApiKey?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearApiKey }) => {
  return (
    <header className="text-center relative">
      <h1 className="text-3xl font-bold text-black tracking-tight">
        LinkedIn <span className="text-cyan-500">Post</span> <span className="text-amber-500">Drafter</span>
      </h1>
       <p className="mt-1 text-xs text-gray-500">
        A project by <a href="https://thevectorcamp.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">thevectorcamp.in</a>
      </p>
      {onClearApiKey && (
        <div className="absolute top-0 right-0">
           <Button onClick={onClearApiKey} variant="secondary" className="!w-auto !py-0.5 !px-2 !text-xs">
             Change Key
           </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
