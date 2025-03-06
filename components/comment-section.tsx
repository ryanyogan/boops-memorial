"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getComments, addComment, addReply } from "@/lib/actions"
import type { CommentType } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { Send, Reply } from "lucide-react"

interface CommentSectionProps {
  imageId: string
  isAuthenticated: boolean
}

export default function CommentSection({ imageId, isAuthenticated }: CommentSectionProps) {
  const router = useRouter()
  const [comments, setComments] = useState<CommentType[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(imageId)
      setComments(fetchedComments)
    }

    fetchComments()
  }, [imageId])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!newComment.trim()) return

    try {
      setIsLoading(true)
      const comment = await addComment({
        imageId,
        content: newComment,
      })

      setComments([...comments, comment])
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReply = async (commentId: string) => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const text = replyText[commentId]
    if (!text?.trim()) return

    try {
      setIsLoading(true)
      const reply = await addReply({
        imageId,
        parentId: commentId,
        content: text,
      })

      // Update the comments with the new reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      })

      setComments(updatedComments)
      setReplyText({
        ...replyText,
        [commentId]: "",
      })
      setReplyingTo(null)
    } catch (error) {
      console.error("Failed to add reply:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleReply = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null)
    } else {
      setReplyingTo(commentId)
      if (!replyText[commentId]) {
        setReplyText({
          ...replyText,
          [commentId]: "",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments</h3>

      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="flex items-start space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
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
      ) : (
        <div className="p-4 rounded-md bg-muted">
          <p className="text-sm text-center">
            <Button variant="link" onClick={() => router.push("/login")} className="p-0 h-auto">
              Sign in
            </Button>{" "}
            to leave a comment
          </p>
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user?.image || ""} />
                  <AvatarFallback>{comment.user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium">{comment.user?.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{comment.content}</p>

                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleToggleReply(comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>

                  {replyingTo === comment.id && isAuthenticated && (
                    <div className="mt-4 flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          value={replyText[comment.id] || ""}
                          onChange={(e) =>
                            setReplyText({
                              ...replyText,
                              [comment.id]: e.target.value,
                            })
                          }
                          placeholder="Add a reply..."
                          className="min-h-[60px] resize-none text-sm"
                        />
                        <div className="mt-2 flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 text-xs h-8"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs h-8"
                            disabled={isLoading}
                            onClick={() => handleReply(comment.id)}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.user?.image || ""} />
                        <AvatarFallback>{reply.user?.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-medium">{reply.user?.name || "User"}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </div>
  )
}

