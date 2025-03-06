"use server";

import { revalidatePath } from "next/cache";
import { db, getCommentsForImage } from "./db";
import type { CommentType } from "./types";

export type MemoryUpload = {
  url: string;
  name: string;
  size: number;
  caption?: string;
  date?: string;
};

// Image actions
export async function uploadImage(formData: {
  caption: string;
  date?: string;
  file: any;
}) {
  try {
    const { rows } = await db.query(
      `INSERT INTO images (url, caption, created_at)
       VALUES ($1, $2, $3)
       RETURNING id, url, caption, created_at as "createdAt"`,
      [
        formData.file.url,
        formData.caption,
        formData.date
          ? new Date(formData.date).toISOString()
          : new Date().toISOString(),
      ]
    );

    revalidatePath("/");
    return rows[0];
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}

export async function createMemory(memory: MemoryUpload) {
  try {
    const { rows } = await db.query(
      `INSERT INTO images (url, caption, created_at)
       VALUES ($1, $2, $3)
       RETURNING id, url, caption, created_at as "createdAt"`,
      [
        memory.url,
        memory.caption || null,
        memory.date
          ? new Date(memory.date).toISOString()
          : new Date().toISOString(),
      ]
    );

    revalidatePath("/");
    return rows[0];
  } catch (error) {
    console.error("Error creating memory:", error);
    throw new Error("Failed to create memory");
  }
}

// Comment actions
export async function getComments(imageId: string): Promise<CommentType[]> {
  const comments = await getCommentsForImage(imageId);
  return comments;
}

export async function addComment({
  imageId,
  content,
}: {
  imageId: string;
  content: string;
}) {
  try {
    const { rows } = await db.query(
      `INSERT INTO comments (content, created_at, image_id, parent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, content, created_at as "createdAt", 
                 image_id as "imageId", parent_id as "parentId"`,
      [content, new Date().toISOString(), imageId, null]
    );

    revalidatePath(`/photos/${imageId}`);
    return rows[0];
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}

export async function addReply({
  imageId,
  parentId,
  content,
}: {
  imageId: string;
  parentId: string;
  content: string;
}) {
  try {
    const { rows } = await db.query(
      `INSERT INTO comments (content, created_at, image_id, parent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, content, created_at as "createdAt", 
                 image_id as "imageId", parent_id as "parentId"`,
      [content, new Date().toISOString(), imageId, parentId]
    );

    revalidatePath(`/photos/${imageId}`);
    return rows[0];
  } catch (error) {
    console.error("Error adding reply:", error);
    throw new Error("Failed to add reply");
  }
}
