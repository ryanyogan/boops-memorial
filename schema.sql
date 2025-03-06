-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create images table
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  caption VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_id INTEGER REFERENCES images(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_images_user_id ON images(user_id);
CREATE INDEX idx_comments_image_id ON comments(image_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

