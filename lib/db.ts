import type { ImageType, CommentType } from "./types"

// Sample dog images for demonstration
const sampleImages = [
  {
    id: "1",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison enjoying the sunshine",
    createdAt: new Date(2023, 11, 15).toISOString(),
    userId: "user1",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Eddy's first day at the park",
    createdAt: new Date(2023, 10, 25).toISOString(),
    userId: "user1",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Bath time fun!",
    createdAt: new Date(2023, 9, 10).toISOString(),
    userId: "user1",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Eddy with his favorite toy",
    createdAt: new Date(2023, 8, 20).toISOString(),
    userId: "user2",
  },
  {
    id: "5",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Napping on the couch",
    createdAt: new Date(2023, 7, 5).toISOString(),
    userId: "user2",
  },
  {
    id: "6",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Eddy's first birthday",
    createdAt: new Date(2023, 6, 15).toISOString(),
    userId: "user1",
  },
  {
    id: "7",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Playing fetch at the beach",
    createdAt: new Date(2023, 5, 22).toISOString(),
    userId: "user2",
  },
  {
    id: "8",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison in the snow",
    createdAt: new Date(2023, 4, 8).toISOString(),
    userId: "user1",
  },
  {
    id: "9",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Car ride adventures",
    createdAt: new Date(2023, 3, 17).toISOString(),
    userId: "user2",
  },
  {
    id: "10",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison making friends at the dog park",
    createdAt: new Date(2023, 2, 28).toISOString(),
    userId: "user1",
  },
  {
    id: "11",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Puppy Edison's first day home",
    createdAt: new Date(2023, 1, 10).toISOString(),
    userId: "user1",
  },
  {
    id: "12",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison begging for treats",
    createdAt: new Date(2023, 0, 5).toISOString(),
    userId: "user2",
  },
  {
    id: "13",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Sunny day at the lake",
    createdAt: new Date(2022, 11, 20).toISOString(),
    userId: "user1",
  },
  {
    id: "14",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison's silly face",
    createdAt: new Date(2022, 10, 15).toISOString(),
    userId: "user2",
  },
  {
    id: "15",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Hiking day with Eddy",
    createdAt: new Date(2022, 9, 30).toISOString(),
    userId: "user1",
  },
  {
    id: "16",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison watching the sunset",
    createdAt: new Date(2022, 8, 12).toISOString(),
    userId: "user2",
  },
  {
    id: "17",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Eddy playing in autumn leaves",
    createdAt: new Date(2022, 7, 25).toISOString(),
    userId: "user1",
  },
  {
    id: "18",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Lazy Sunday with Edison",
    createdAt: new Date(2022, 6, 8).toISOString(),
    userId: "user2",
  },
  {
    id: "19",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Eddy's new haircut",
    createdAt: new Date(2022, 5, 19).toISOString(),
    userId: "user1",
  },
  {
    id: "20",
    url: "/placeholder.svg?height=600&width=600",
    caption: "Edison with his favorite human",
    createdAt: new Date(2022, 4, 22).toISOString(),
    userId: "user2",
  },
]

// Sample comments for demonstration
const sampleComments = [
  {
    id: "comment1",
    content: "What a beautiful picture of Edison!",
    createdAt: new Date(2023, 11, 16).toISOString(),
    userId: "user2",
    imageId: "1",
    parentId: null,
    user: {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      image: null,
    },
    replies: [],
  },
  {
    id: "comment2",
    content: "I miss him so much. This brings back great memories.",
    createdAt: new Date(2023, 11, 17).toISOString(),
    userId: "user3",
    imageId: "1",
    parentId: null,
    user: {
      id: "user3",
      name: "Robert Jones",
      email: "robert@example.com",
      image: null,
    },
    replies: [
      {
        id: "reply1",
        content: "Me too. He was such a special dog.",
        createdAt: new Date(2023, 11, 18).toISOString(),
        userId: "user1",
        imageId: "1",
        parentId: "comment2",
        user: {
          id: "user1",
          name: "John Doe",
          email: "john@example.com",
          image: null,
        },
      },
    ],
  },
]

// This function would normally fetch images from the database
export async function getImages(): Promise<ImageType[]> {
  // In a real implementation, this would query the database
  // const { rows } = await sql`SELECT * FROM images ORDER BY created_at DESC`;

  // For demonstration purposes, return sample images
  return sampleImages
}

// Get an image by ID
export async function getImageById(id: string): Promise<ImageType | null> {
  // In a real implementation, this would query the database
  // const { rows } = await sql`SELECT * FROM images WHERE id = ${id}`;
  // return rows[0] || null;

  // For demonstration, find the image in our sample data
  const image = sampleImages.find((img) => img.id === id)
  return image || null
}

// Get comments for an image
export async function getCommentsForImage(imageId: string): Promise<CommentType[]> {
  // In a real implementation, this would query the database
  // const { rows } = await sql`
  //   SELECT c.*, u.name, u.email, u.image
  //   FROM comments c
  //   JOIN users u ON c.user_id = u.id
  //   WHERE c.image_id = ${imageId} AND c.parent_id IS NULL
  //   ORDER BY c.created_at DESC
  // `;

  // For demonstration, filter comments for the specified image
  return sampleComments.filter((comment) => comment.imageId === imageId)
}

