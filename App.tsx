import React, { useState, useCallback, useEffect } from 'react';
import { generateFullPost } from './services/geminiService';
import type { Post } from './types';
import Header from './components/Header';
import Button from './components/Button';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import PostEditor from './components/PostEditor';
import PostPreview from './components/PostPreview';
import TextInput from './components/TextInput';
import ToggleSwitch from './components/ToggleSwitch';
import { parseLinkedInMarkdown } from './utils/unicodeConverter';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [includeImage, setIncludeImage] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for API key in localStorage on initial load
    const storedApiKey = localStorage.getItem('gemini-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('gemini-api-key', key);
    setApiKey(key);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey(null);
  };

  const handleGeneratePost = useCallback(async () => {
    if (!apiKey) {
      setError('Please set your API key first.');
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic to generate a post.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPost(null);

    try {
      const newPost = await generateFullPost(topic, includeImage, apiKey);
      const parsedText = parseLinkedInMarkdown(newPost.text);
      setPost(newPost);
      setEditedText(parsedText);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while generating the post. Check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, includeImage, apiKey]);
  
  const handleNewPost = () => {
    setPost(null);
    setTopic('');
    setEditedText('');
    setError(null);
  };

  if (!apiKey) {
    return <ApiKeyModal onSaveKey={handleSaveApiKey} />;
  }

  return (
    <div className="bg-[#FDF9F2] min-h-screen text-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onClearApiKey={handleClearApiKey} />
        <main className="mt-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-2xl font-bold">What's your post about?</h2>
                 {post && (
                    <Button onClick={handleNewPost} variant="secondary" className="!w-auto !py-1 !text-base">
                      Create New Post
                    </Button>
                 )}
              </div>
              <p className="text-gray-600 mb-4">
                Enter a topic, and we'll draft a LinkedIn post with a custom graphic for you.
              </p>
              <div className="space-y-4">
                <TextInput
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The evolution of state management in React"
                  disabled={isLoading}
                />
                <ToggleSwitch 
                  label="Include AI Graphic?"
                  checked={includeImage}
                  onChange={setIncludeImage}
                />
                <Button onClick={handleGeneratePost} disabled={isLoading || !topic.trim()} className="w-full !py-3 !text-lg">
                  <SparklesIcon className="w-6 h-6 mr-2" />
                  {isLoading ? 'Drafting your masterpiece...' : 'Generate Post'}
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading && <Loader />}
          
          {error && (
            <div className="mt-6 max-w-2xl mx-auto bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg relative shadow-[4px_4px_0px_#EF4444]" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isLoading && post && (
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <PostEditor 
                  postText={editedText}
                  onTextChange={setEditedText}
                  imageUrl={post.imageUrl}
                />
                <PostPreview 
                  editedText={editedText}
                  imageUrl={post.imageUrl}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;