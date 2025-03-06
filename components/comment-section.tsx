"use client";

import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment, addReply, getComments } from "@/lib/actions";
import type { CommentType } from "@/lib/types";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentSectionProps {
  imageId: string;
}

export default function CommentSection({ imageId }: CommentSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(imageId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [imageId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsLoading(true);
      const comment = await addComment({
        imageId,
        content: newComment,
      });

      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (commentId: string) => {
    const text = replyText[commentId];
    if (!text?.trim()) return;

    try {
      setIsLoading(true);
      const reply = await addReply({
        imageId,
        parentId: commentId,
        content: text,
      });

      // Update the comments with the new reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyText({
        ...replyText,
        [commentId]: "",
      });
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to add reply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleReply = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
      if (!replyText[commentId]) {
        setReplyText({
          ...replyText,
          [commentId]: "",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments</h3>

      <form onSubmit={handleAddComment} className="flex items-start space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[80px] resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" size="sm" disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              Comment
            </Button>
          </div>
        </div>
      </form>

      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Guest</p>
            <p className="text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
