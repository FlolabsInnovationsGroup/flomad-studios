'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Eye, Plus, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: '1',
    title: 'How to Create an Effective Design System',
    excerpt: 'Learn the fundamentals of creating a design system that scales with your product and team needs.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    readTime: '8 min read',
    views: 2567,
    published: true,
    date: '2023-11-28',
    category: 'Design',
  },
  {
    id: '2',
    title: 'The Future of Interactive Web Experiences',
    excerpt: 'Explore emerging trends in web design that are creating more immersive and engaging user experiences.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    readTime: '12 min read',
    views: 1845,
    published: true,
    date: '2023-10-15',
    category: 'Web Development',
  },
  {
    id: '3',
    title: 'Optimizing Your Design Workflow',
    excerpt: 'Tips and strategies to streamline your design process and improve team collaboration.',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    readTime: '6 min read',
    views: 1342,
    published: false,
    date: '2023-12-05',
    category: 'Productivity',
  },
  {
    id: '4',
    title: 'Typography Trends for 2024',
    excerpt: 'A deep dive into emerging typography trends that will dominate digital design in the coming year.',
    coverImage: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083',
    readTime: '10 min read',
    views: 976,
    published: true,
    date: '2023-12-10',
    category: 'Typography',
  },
  {
    id: '5',
    title: 'Building Client Relationships That Last',
    excerpt: 'Strategies for developing strong, long-term client relationships in the creative industry.',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    readTime: '7 min read',
    views: 754,
    published: false,
    date: '2023-11-22',
    category: 'Business',
  },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const filteredBlogPosts = blogPosts
    .filter(post => {
      if (filter === 'all') return true;
      if (filter === 'published') return post.published;
      if (filter === 'drafts') return !post.published;
      return true;
    })
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDelete = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    setShowActionMenu(null);
  };

  const togglePublish = (id: string) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ));
    setShowActionMenu(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-foreground/70 mt-1">Manage your blog content</p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/blog/new">
            <Plus size={16} />
            New Post
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'published' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('published')}
          >
            Published
          </Button>
          <Button 
            variant={filter === 'drafts' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('drafts')}
          >
            Drafts
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search posts or categories..."
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Blog Posts List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-medium">Post</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Read Time</th>
                <th className="p-4 font-medium">Views</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogPosts.map((post) => (
                <tr key={post.id} className="border-b border-border hover:bg-muted/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-muted rounded overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ 
                            backgroundImage: `url(${post.coverImage})`,
                            // Dynamic content requires inline styles
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium truncate max-w-[250px]">{post.title}</span>
                        <span className="text-xs text-foreground/60 truncate max-w-[250px]">{post.excerpt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/70">{post.readTime}</td>
                  <td className="p-4 text-foreground/70">{post.views.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/70">{post.date}</td>
                  <td className="p-4 text-right">
                    <div className="relative inline-block">
                      <button 
                        className="p-2 hover:bg-muted rounded-full"
                        onClick={() => setShowActionMenu(showActionMenu === post.id ? null : post.id)}
                        aria-label="Post actions menu"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {showActionMenu === post.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-card shadow-lg rounded-md border border-border py-1 z-10">
                          <button 
                            className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                            onClick={() => alert(`Edit ${post.title}`)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button 
                            className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                            onClick={() => togglePublish(post.id)}
                          >
                            <Eye className="w-4 h-4" />
                            {post.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button 
                            className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted text-red-500"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredBlogPosts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-foreground/50">
                    {searchQuery 
                      ? "No blog posts match your search" 
                      : filter !== 'all' 
                        ? `No ${filter} blog posts found` 
                        : "No blog posts found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 