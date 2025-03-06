export interface ImageType {
  id: string;
  url: string;
  caption: string | null;
  createdAt: string;
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  imageId: string;
  parentId: string | null;
  replies?: CommentType[];
}
