'use client';

import { useState, useEffect } from 'react';
import { MoreVertical, Edit, Trash2, Eye, Plus, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define the Post type
interface PostData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    name: string | null;
    email: string;
  };
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredBlogPosts = blogPosts
    .filter(post => {
      if (filter === 'all') return true;
      if (filter === 'published') return post.published;
      if (filter === 'drafts') return !post.published;
      return true;
    })
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setBlogPosts(blogPosts.filter(post => post.id !== id));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const togglePublish = async (id: string) => {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !post.published
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setBlogPosts(blogPosts.map(p => 
        p.id === id ? updatedPost : p
      ));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post. Please try again.');
    }
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

      {loading && (
        <Card variant="glass" className="p-8 text-center">
          <p className="text-foreground/70">Loading posts...</p>
        </Card>
      )}

      {error && (
        <Card variant="glass" className="p-8 text-center">
          <p className="text-red-500">{error}</p>
        </Card>
      )}

      {!loading && !error && (
        <>
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
                <th className="p-4 font-medium">Author</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Created</th>
                <th className="p-4 font-medium">Updated</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogPosts.map((post) => (
                <tr key={post.id} className="border-b border-border hover:bg-muted/5">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium truncate max-w-[250px]">{post.title}</span>
                      <span className="text-xs text-foreground/60 truncate max-w-[300px]">
                        {post.content.slice(0, 80)}...
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground/70">
                    {post.user?.name || 'Unknown'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/70">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-foreground/70">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
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
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
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
        </>
      )}
    </div>
  );
} 
