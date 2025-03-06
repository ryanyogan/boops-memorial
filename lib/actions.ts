"use server"

import { revalidatePath } from "next/cache"
import { auth } from "./auth"
import { redirect } from "next/navigation"
import type { CommentType, ImageType } from "./types"
import { getCommentsForImage } from "./db"

// Sample user data for demonstration
const sampleUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456", // In real app, this would be hashed
  },
]

// Sample counter for generating IDs
let idCounter = 100

// Authentication actions
export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  // In a real app, this would authenticate against the database and use proper password hashing
  const user = sampleUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  // In a real app, this would create a proper session
  // await signIn("credentials", { email, password });

  return { success: true }
}

export async function register({
  email,
  password,
}: {
  email: string
  password: string
}) {
  // In a real app, this would check if the user exists and handle password hashing
  const existingUser = sampleUsers.find((u) => u.email === email)

  if (existingUser) {
    return { error: "User already exists with this email" }
  }

  // In a real app, this would insert the user into the database
  const newUser = {
    id: `user${idCounter++}`,
    name: email.split("@")[0],
    email,
    password, // In real app, this would be hashed
  }

  sampleUsers.push(newUser)

  return { success: true }
}

// Image actions
export async function uploadImage(formData: { caption: string; date?: string; file: any }) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  try {
    // In a real implementation, this would upload to UploadThing or similar
    // and save the image record to the database
    const newImage: ImageType = {
      id: `image${idCounter++}`,
      url: "/placeholder.svg?height=600&width=600",
      caption: formData.caption,
      createdAt: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      userId: "user1", // In real app, this would be the session user ID
    }

    revalidatePath("/")
    return newImage
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

// Comment actions
export async function getComments(imageId: string): Promise<CommentType[]> {
  // Fetch comments from the database and organize them into threads
  const comments = await getCommentsForImage(imageId)
  return comments
}

export async function addComment({
  imageId,
  content,
}: {
  imageId: string
  content: string
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  try {
    // In a real implementation, this would insert into the database
    const newComment: CommentType = {
      id: `comment${idCounter++}`,
      content,
      createdAt: new Date().toISOString(),
      userId: "user1", // In real app, this would be the session user ID
      imageId,
      parentId: null,
      user: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      },
    }

    revalidatePath(`/photos/${imageId}`)
    return newComment
  } catch (error) {
    console.error("Error adding comment:", error)
    throw new Error("Failed to add comment")
  }
}

export async function addReply({
  imageId,
  parentId,
  content,
}: {
  imageId: string
  parentId: string
  content: string
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  try {
    // In a real implementation, this would insert into the database
    const newReply: CommentType = {
      id: `reply${idCounter++}`,
      content,
      createdAt: new Date().toISOString(),
      userId: "user1", // In real app, this would be the session user ID
      imageId,
      parentId,
      user: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      },
    }

    revalidatePath(`/photos/${imageId}`)
    return newReply
  } catch (error) {
    console.error("Error adding reply:", error)
    throw new Error("Failed to add reply")
  }
}

