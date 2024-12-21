import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../../types';
import { RootState } from '../../store';
import { supabase } from '../../lib/supabase';
import { CommentItem } from './CommentItem';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_id: user?.id,
            content: newComment.trim(),
          },
        ])
        .select('*, author:users(*)');

      if (error) throw error;
      if (data) {
        setComments([...comments, data[0] as Comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-4">
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={3}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">Please connect your wallet to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}