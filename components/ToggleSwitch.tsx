import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <label htmlFor="toggle-switch" className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          id="toggle-switch" 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={handleToggle} 
        />
        <div className={`block w-14 h-8 rounded-full transition-colors ${checked ? 'bg-amber-400' : 'bg-gray-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform shadow-[2px_2px_0px_#000] border-2 border-black ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-lg font-bold text-gray-700">{label}</div>
    </label>
  );
};

export default ToggleSwitch;