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
    title: "Creative Studio Insights",
    description: "Exploring design and development processes in creative studios.",
    src: "/podcasts/creative-insights.mp3",
    poster: "/images/podcasts/creative-insights.jpg",
    category: "Design",
    tags: ["creativity", "design"],
    published: true,
    createdAt: "2023-10-15T09:00:00Z",
    updatedAt: "2023-10-15T09:00:00Z",
    userId: "user-1"
  },
  {
    id: "podcast-2",
    title: "Digital Studio Process",
    description: "Behind the scenes of modern digital design workflows.",
    src: "/podcasts/studio-process.mp3",
    poster: "/images/podcasts/studio-process.jpg",
    category: "Process",
    tags: ["workflow", "design"],
    published: true,
    createdAt: "2023-09-28T14:30:00Z",
    updatedAt: "2023-09-28T14:30:00Z",
    userId: "user-1"
  }
]; 