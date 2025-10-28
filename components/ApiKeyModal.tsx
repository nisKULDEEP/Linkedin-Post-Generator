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
    <div className="bg-[#FDF9F2] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_#000]">
          <h2 className="text-3xl font-bold text-center">Enter Your API Key</h2>
          <p className="text-gray-600 mt-2 mb-6 text-center">
            To use this app, please provide your Google AI Studio API key. Your key is stored securely in your browser's local storage and is never sent to us.
          </p>
          <div className="space-y-4">
            <TextInput
              rows={2}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google AI Studio API key here"
            />
            <Button onClick={handleSave} disabled={!apiKey.trim()} className="w-full !py-3 !text-lg">
              Save and Start Generating
            </Button>
          </div>
          <div className="text-center mt-4">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-600 hover:text-amber-700 underline"
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