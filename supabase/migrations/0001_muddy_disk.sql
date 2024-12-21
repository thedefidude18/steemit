/*
  # Initial Schema Setup for Steemit Clone

  1. New Tables
    - users
      - id (uuid, primary key)
      - wallet_address (text, unique)
      - username (text, unique)
      - reputation (integer)
      - created_at (timestamp)
    
    - posts
      - id (uuid, primary key)
      - author_id (uuid, foreign key)
      - title (text)
      - content (text)
      - tags (text[])
      - upvotes (integer)
      - downvotes (integer)
      - created_at (timestamp)
    
    - comments
      - id (uuid, primary key)
      - post_id (uuid, foreign key)
      - author_id (uuid, foreign key)
      - parent_id (uuid, self-referencing foreign key)
      - content (text)
      - created_at (timestamp)
    
    - votes
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - post_id (uuid, foreign key)
      - vote_type (boolean)
      - amount (numeric)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  reputation integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Posts table
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  parent_id uuid REFERENCES comments(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Votes table
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  post_id uuid REFERENCES posts(id) NOT NULL,
  vote_type boolean NOT NULL,
  amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read votes"
  ON votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create votes"
  ON votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their votes"
  ON votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX posts_tags_idx ON posts USING gin(tags);
CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_parent_id_idx ON comments(parent_id);
CREATE INDEX votes_post_id_idx ON votes(post_id);