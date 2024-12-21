import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    reputation: number;
  };
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  filter: 'trending' | 'hot' | 'new';
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  filter: 'trending',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<PostsState['filter']>) => {
      state.filter = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.items.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setPosts, setLoading, setError, setFilter, addPost, updatePost } =
  postsSlice.actions;
export default postsSlice.reducer;