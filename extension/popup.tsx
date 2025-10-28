// Fix: Resolve errors with chrome types by declaring 'chrome' as a global variable.
declare const chrome: any;

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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

const Popup: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  
  const [topic, setTopic] = useState<string>('');
  const [postHistory, setPostHistory] = useState<string>('');
  const [contextStatus, setContextStatus] = useState<string>('');

  const [includeImage, setIncludeImage] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get('gemini-api-key', (result) => {
      if (result['gemini-api-key']) {
        setApiKey(result['gemini-api-key']);
        setHasApiKey(true);
      }
    });
  }, []);

  const handleSaveApiKey = (key: string) => {
    chrome.storage.local.set({ 'gemini-api-key': key }, () => {
      setApiKey(key);
      setHasApiKey(true);
    });
  };

  const handleClearApiKey = () => {
    chrome.storage.local.remove('gemini-api-key', () => {
      setApiKey(null);
      setHasApiKey(false);
      setPost(null);
      setTopic('');
      setPostHistory('');
      setContextStatus('');
    });
  };

  const handleAnalyzePosts = useCallback(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) return;
  
    setIsScraping(true);
    setError(null);
    setContextStatus('');
    setPostHistory('');
  
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['dist/content-script.js'],
      });
      
      if (results && results[0] && results[0].result) {
        const { history, count } = results[0].result as { history: string; count: number };
        if (!history.trim() || count === 0) {
           setError("Could not find any posts. Make sure you are on your LinkedIn profile page and your posts are visible.");
        } else {
            setPostHistory(history);
            setContextStatus(`✅ Context from ${count} recent posts loaded!`);
        }
      }
    } catch (e) {
      console.error("Scraping error:", e);
      setError("Failed to analyze posts. Ensure you're on your LinkedIn profile page and refresh if needed.");
    } finally {
      setIsScraping(false);
    }
  }, []);

  const handleGeneratePost = useCallback(async () => {
    if (!apiKey) {
      setError('Please set your API key first.');
      return;
    }
    
    // Allow generation if either topic or context is present
    if (!topic.trim() && !postHistory.trim()) {
        setError('Please enter a topic or analyze recent posts first.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setPost(null);
    
    try {
      const newPost = await generateFullPost(topic, includeImage, apiKey, postHistory);
      const parsedText = parseLinkedInMarkdown(newPost.text);
      setPost(newPost);
      setEditedText(parsedText);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, includeImage, apiKey, postHistory]);
  
  const handleNewPost = () => {
    setPost(null);
    setTopic('');
    setEditedText('');
    setError(null);
    // Keep post history and status
  };
  
  if (!hasApiKey) {
    return <ApiKeyModal onSaveKey={handleSaveApiKey} />;
  }

  return (
    <div className="bg-[#FDF9F2] text-[#333] p-4">
        <Header onClearApiKey={handleClearApiKey} />
        
        { !post ? (
          <main className="mt-4">
            <div className="bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-xl font-bold">Create a New Post</h2>
              </div>
              <div className="space-y-3">
                 <TextInput
                    rows={2}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic... (Optional)"
                    disabled={isLoading || isScraping}
                  />

                 <Button onClick={handleAnalyzePosts} disabled={isScraping || isLoading} className="w-full !py-1.5 !text-base" variant="secondary">
                    {isScraping ? 'Analyzing...' : 'Analyze Recent Posts'}
                 </Button>

                 {contextStatus && !error && (
                    <p className="text-sm text-green-700 text-center font-bold">{contextStatus}</p>
                 )}

                <ToggleSwitch 
                  label="Include AI Graphic?"
                  checked={includeImage}
                  onChange={setIncludeImage}
                />
                <Button onClick={handleGeneratePost} disabled={isLoading || isScraping} className="w-full !py-2 !text-base">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {isLoading ? 'Drafting...' : 'Generate Post'}
                </Button>
                 <p className="text-xs text-gray-600 text-center pt-1">
                    To suggest a post based on your style, leave the topic empty after analyzing.
                 </p>
              </div>
            </div>
          </main>
        ) : (
          <main className="mt-4">
              <Button onClick={handleNewPost} variant="secondary" className="w-full mb-4">
                Create a Different Post
              </Button>
              <div className="grid grid-cols-1 gap-4 items-start">
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
          </main>
        )}

        {(isLoading || isScraping) && <Loader isScraping={isScraping} />}
            
        {error && (
          <div className="mt-4 bg-red-100 border-2 border-red-500 text-red-700 px-3 py-2 rounded-lg relative shadow-[4px_4px_0px_#EF4444]" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline text-sm">{error}</span>
          </div>
        )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);