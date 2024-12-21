import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../types';
import { PostCard } from '../components/posts/PostCard';
import { supabase } from '../lib/supabase';
import { RootState } from '../store';

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const filter = useSelector((state: RootState) => state.posts.filter);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('posts')
        .select('*, author:users(*)')
        .order('created_at', { ascending: false });

      if (filter === 'trending') {
        query = query.order('upvotes', { ascending: false });
      } else if (filter === 'hot') {
        // Implement hot algorithm based on time and votes
        query = query.order('upvotes', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data as Post[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (postId: string, isUpvote: boolean) => {
    // Implement voting logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onVote={handleVote} />
      ))}
    </div>
  );
}