import type { CommentType, ImageType } from "./types";

import { createPool } from "@vercel/postgres";

export const db = createPool({
  connectionString: process.env.POSTGRES_URL!,
});

// Get all images
export async function getImages(): Promise<ImageType[]> {
  const { rows } = await db.query(`
    SELECT i.*, u.name as user_name, u.email as user_email 
    FROM images i 
    JOIN users u ON i.user_id = u.id 
    ORDER BY i.created_at DESC
  `);
  return rows;
}

// Get an image by ID
export async function getImageById(id: string): Promise<ImageType | null> {
  const { rows } = await db.query(
    `SELECT i.*, u.name as user_name, u.email as user_email 
     FROM images i 
     JOIN users u ON i.user_id = u.id 
     WHERE i.id = $1`,
    [id]
  );
  return rows[0] || null;
}

// Get comments for an image
export async function getCommentsForImage(
  imageId: string
): Promise<CommentType[]> {
  const { rows } = await db.query(
    `SELECT c.*, u.name, u.email, u.image
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.image_id = $1 AND c.parent_id IS NULL
     ORDER BY c.created_at DESC`,
    [imageId]
  );

  // Fetch replies for each comment
  for (const comment of rows) {
    const { rows: replies } = await db.query(
      `SELECT c.*, u.name, u.email, u.image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.parent_id = $1
       ORDER BY c.created_at ASC`,
      [comment.id]
    );
    comment.replies = replies;
  }

  return rows;
}
