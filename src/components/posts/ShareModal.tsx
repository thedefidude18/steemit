import { X, Copy, Twitter, Facebook, LinkedIn } from 'lucide-react';

interface ShareModalProps {
  postUrl: string;
  onClose: () => void;
}

export function ShareModal({ postUrl, onClose }: ShareModalProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Share Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={postUrl}
            readOnly
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-blue-600"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-blue-400"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-blue-600"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-blue-700"
          >
            <LinkedIn className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}