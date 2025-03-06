export interface ImageType {
  id: string;
  url: string;
  caption: string | null;
  created_at: string;
}

export interface CommentType {
  id: string;
  content: string;
  created_at: string;
  image_id: string;
  parent_id: string | null;
  replies?: CommentType[];
}
