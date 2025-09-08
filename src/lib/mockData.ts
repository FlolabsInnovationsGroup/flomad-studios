export interface Podcast {
  id: string;
  title: string;
  description?: string;
  src: string;
  poster?: string | null;
  category?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const mockPodcasts: Podcast[] = [
  {
    id: "podcast-1",
    title: "The Creative Process",
    description: "A deep dive into the workflow and inspiration behind successful creative professionals.",
    src: "/podcasts/the-creative-process.mp3",
    poster: "/images/podcasts/creative-process.jpg",
    category: "Design",
    tags: ["creativity", "design", "workflow"],
    published: true,
    createdAt: "2023-10-15T09:00:00Z",
    updatedAt: "2023-10-15T09:00:00Z",
    userId: "user-1"
  },
  {
    id: "podcast-2",
    title: "Future of Web Development",
    description: "Exploring emerging trends, technologies, and best practices in web development.",
    src: "/podcasts/future-of-web-dev.mp3",
    poster: "/images/podcasts/web-development.jpg",
    category: "Technology",
    tags: ["web", "development", "coding", "future"],
    published: true,
    createdAt: "2023-09-28T14:30:00Z",
    updatedAt: "2023-09-28T14:30:00Z",
    userId: "user-1"
  },
  {
    id: "podcast-3",
    title: "Digital Marketing Strategies",
    description: "Effective approaches to building and maintaining a strong online presence.",
    src: "/podcasts/digital-marketing.mp3",
    poster: "/images/podcasts/digital-marketing.jpg",
    category: "Marketing",
    tags: ["marketing", "digital", "strategy", "social media"],
    published: true,
    createdAt: "2023-09-10T11:15:00Z",
    updatedAt: "2023-09-10T11:15:00Z",
    userId: "user-2"
  },
  {
    id: "podcast-4",
    title: "Entrepreneurship Today",
    description: "Insights and stories from successful founders and business leaders.",
    src: "/podcasts/entrepreneurship.mp3",
    poster: "/images/podcasts/entrepreneurship.jpg",
    category: "Business",
    tags: ["startup", "business", "entrepreneurship"],
    published: true,
    createdAt: "2023-08-25T16:45:00Z",
    updatedAt: "2023-08-25T16:45:00Z",
    userId: "user-1"
  },
  {
    id: "podcast-5",
    title: "UX Design Principles",
    description: "Core principles and practices for creating exceptional user experiences.",
    src: "/podcasts/ux-design.mp3",
    poster: "/images/podcasts/ux-design.jpg",
    category: "Design",
    tags: ["ux", "design", "interface", "usability"],
    published: false,
    createdAt: "2023-11-02T10:20:00Z",
    updatedAt: "2023-11-02T10:20:00Z",
    userId: "user-1"
  }
]; 