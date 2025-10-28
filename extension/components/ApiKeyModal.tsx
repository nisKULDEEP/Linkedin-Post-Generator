import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';

interface ApiKeyModalProps {
  onSaveKey: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSaveKey }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onSaveKey(apiKey.trim());
    }
  };

  return (
    <div className="bg-[#FDF9F2] p-4 min-h-[300px] flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[8px_8px_0px_#000]">
          <h2 className="text-2xl font-bold text-center">Enter Your API Key</h2>
          <p className="text-gray-600 mt-2 mb-4 text-center text-sm">
            Please provide your Google AI Studio API key. Your key is stored securely in the extension's local storage and is never sent to us.
          </p>
          <div className="space-y-3">
            <TextInput
              rows={2}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google AI Studio API key"
            />
            <Button onClick={handleSave} disabled={!apiKey.trim()} className="w-full !py-2 !text-base">
              Save and Start Generating
            </Button>
          </div>
          <div className="text-center mt-3">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-600 hover:text-amber-700 underline"
            >
              Don't have a key? Get one here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
