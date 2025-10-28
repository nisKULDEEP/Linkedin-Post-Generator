import React, { useState, useCallback, useRef } from 'react';
import Button from './Button';
import { CopyIcon } from './icons/CopyIcon';
import { BoldIcon } from './icons/BoldIcon';
import { ItalicIcon } from './icons/ItalicIcon';
import { PostNowIcon } from './icons/PostNowIcon';
import { convertToUnicode } from '../utils/unicodeConverter';
import Modal from './Modal';

type FormatType = 'bold' | 'italic';

interface PostEditorProps {
  postText: string;
  onTextChange: (newText: string) => void;
  imageUrl?: string;
}

const PostEditor: React.FC<PostEditorProps> = ({ postText, onTextChange, imageUrl }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(postText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [postText]);
  
  const handlePostToLinkedIn = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  
  const proceedToLinkedIn = useCallback(() => {
    setIsModalOpen(false);
    const postAction = () => {
      const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&text=${encodeURIComponent(postText)}`;
      window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    };

    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'linkedin-ai-graphic.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(postAction, 300);
    } else {
      postAction();
    }
  }, [postText, imageUrl]);

  const handleFormat = useCallback((format: FormatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) return;

    const selectedText = postText.substring(start, end);
    const formattedText = convertToUnicode(selectedText, format);

    const newText = postText.substring(0, start) + formattedText + postText.substring(end);
    onTextChange(newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, start + formattedText.length);
      }
    }, 0);
  }, [postText, onTextChange]);


  return (
    <>
      <div className="bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_#000] p-4 space-y-4 flex flex-col">
        <h3 className="text-2xl font-bold">Edit Your Post</h3>
        <div className="border-2 border-black rounded-t-lg p-2 flex items-center space-x-1 bg-gray-50">
          <button onClick={() => handleFormat('bold')} title="Bold" className="p-2 rounded-md hover:bg-gray-200 transition-colors">
            <BoldIcon className="w-5 h-5" />
          </button>
          <button onClick={() => handleFormat('italic')} title="Italic" className="p-2 rounded-md hover:bg-gray-200 transition-colors">
            <ItalicIcon className="w-5 h-5" />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={postText}
          onChange={(e) => onTextChange(e.target.value)}
          rows={15}
          className="w-full p-3 text-base text-gray-800 bg-white border-2 border-black border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y flex-grow"
          placeholder="Write your post here..."
        />
        <div className="pt-4 flex items-center space-x-4">
          <Button onClick={handlePostToLinkedIn} className="!text-base w-auto" variant="primary">
            <PostNowIcon className="w-5 h-5 mr-2" />
            Post on LinkedIn
          </Button>
          <Button onClick={handleCopyText} disabled={isCopied} className="!text-base w-auto" variant="secondary">
            <CopyIcon className="w-5 h-5 mr-2" />
            {isCopied ? 'Copied!' : 'Copy Text'}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={proceedToLinkedIn}
        title="Ready to Post?"
      >
        {imageUrl ? (
          <p>
            Your AI graphic has been downloaded to your computer.
            <br /><br />
            Remember to <strong>upload it on the LinkedIn page</strong> that will open next!
          </p>
        ) : (
          <p>
            We're about to open LinkedIn so you can publish your post.
          </p>
        )}
      </Modal>
    </>
  );
};

export default PostEditor;