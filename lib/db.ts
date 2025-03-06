import type { CommentType, ImageType } from "./types";

import { createPool } from "@vercel/postgres";

export const db = createPool({
  connectionString: process.env.POSTGRES_URL!,
});

// Get all images
export async function getImages(): Promise<ImageType[]> {
  const { rows } = await db.query(`
    SELECT * FROM images 
    ORDER BY created_at DESC
  `);
  return rows;
}

// Get an image by ID
export async function getImageById(id: string): Promise<ImageType | null> {
  const { rows } = await db.query(`SELECT * FROM images WHERE id = $1`, [id]);
  return rows[0] || null;
}

// Get comments for an image
export async function getCommentsForImage(
  imageId: string
): Promise<CommentType[]> {
  const { rows } = await db.query(
    `SELECT *
     FROM comments
     WHERE image_id = $1 AND parent_id IS NULL
     ORDER BY created_at DESC`,
    [imageId]
  );

  // Fetch replies for each comment
  for (const comment of rows) {
    const { rows: replies } = await db.query(
      `SELECT *
       FROM comments
       WHERE parent_id = $1
       ORDER BY created_at ASC`,
      [comment.id]
    );
    comment.replies = replies;
  }

  return rows;
}

// Get user by email
export async function getUserByEmail(email: string) {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0] || null;
}

// Create user
export async function createUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  const { rows } = await db.query(
    `INSERT INTO users (email, name, password)
     VALUES ($1, $2, $3)
     RETURNING id, email, name`,
    [email, name, password]
  );
  return rows[0];
}
