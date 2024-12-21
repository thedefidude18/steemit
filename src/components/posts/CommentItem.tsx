import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reply } from 'lucide-react';
import { Comment } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="pl-4 border-l-2 border-gray-200">
      <div className="flex items-center space-x-2 mb-2">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author.username}`}
          alt="avatar"
          className="h-6 w-6 rounded-full"
        />
        <Link
          to={`/@${comment.author.username}`}
          className="font-medium hover:text-blue-600"
        >
          {comment.author.username}
        </Link>
        <span className="text-gray-500">·</span>
        <span className="text-gray-500">{formatDate(comment.createdAt)}</span>
      </div>

      <p className="text-gray-800 mb-2">{comment.content}</p>

      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
      >
        <Reply className="h-4 w-4" />
        <span>Reply</span>
      </button>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}