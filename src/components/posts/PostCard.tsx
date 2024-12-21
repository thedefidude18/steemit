import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, ArrowUp, ArrowDown } from 'lucide-react';
import { Post } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { CommentSection } from './CommentSection';
import { ShareModal } from './ShareModal';

interface PostCardProps {
  post: Post;
  onVote: (postId: string, isUpvote: boolean) => void;
}

export function PostCard({ post, onVote }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const voteCount = post.upvotes - post.downvotes;

  return (
    <article className="bg-white rounded-lg shadow-sm mb-4 p-4">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => onVote(post.id, true)}
            className="text-gray-500 hover:text-blue-600"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
          <span className="font-medium">{voteCount}₦</span>
          <button
            onClick={() => onVote(post.id, false)}
            className="text-gray-500 hover:text-red-600"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.username}`}
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
            <Link to={`/@${post.author.username}`} className="font-medium hover:text-blue-600">
              {post.author.username}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatDate(post.createdAt)}</span>
          </div>

          <Link to={`/post/${post.id}`}>
            <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
              {post.title}
            </h2>
          </Link>

          <div className="prose max-w-none mb-4">
            {post.content.length > 300 ? (
              <>
                {post.content.slice(0, 300)}...
                <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">
                  Read more
                </Link>
              </>
            ) : (
              post.content
            )}
          </div>

          <div className="flex items-center space-x-4 text-gray-500">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comments</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>

          {showComments && <CommentSection postId={post.id} />}
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          postUrl={`${window.location.origin}/post/${post.id}`}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </article>
  );
}