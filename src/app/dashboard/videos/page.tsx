'use client';

import { useState, useEffect } from 'react';
import { Video, MoreVertical, Edit, Trash2, Eye, Upload, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define the Video type
interface VideoData {
  id: string;
  title: string;
  description?: string;
  src: string;
  poster?: string;
  category?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  views?: number; // This might come from analytics
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch videos from the API
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/videos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  const filteredVideos = videos
    .filter(video => {
      if (filter === 'all') return true;
      if (filter === 'published') return video.published;
      if (filter === 'drafts') return !video.published;
      return true;
    })
    .filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete video');
      }
      
      // Remove from state
      setVideos(videos.filter(video => video.id !== id));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete video. Please try again.');
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !currentStatus,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update video');
      }
      
      const updatedVideo = await response.json();
      
      // Update in state
      setVideos(videos.map(video => 
        video.id === id ? updatedVideo : video
      ));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error updating video:', err);
      alert('Failed to update video. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handler functions
  const handleToggleActionMenu = (id: string) => {
    setShowActionMenu(showActionMenu === id ? null : id);
  };

  const handleEditVideo = (id: string) => {
    router.push(`/dashboard/videos/edit/${id}`);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Videos</h1>
          <p className="text-foreground/70 mt-1">Manage your video content</p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/videos/upload">
            <Upload size={16} />
            Upload Video
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleFilterChange('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'published' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleFilterChange('published')}
          >
            Published
          </Button>
          <Button 
            variant={filter === 'drafts' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleFilterChange('drafts')}
          >
            Drafts
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search videos..."
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="p-8 text-center text-red-500">
          <p>{error}</p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {loading && !error && (
        <Card className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </Card>
      )}

      {/* Video List */}
      {!loading && !error && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-4 font-medium">Video</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="border-b border-border hover:bg-muted/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-9 bg-muted rounded overflow-hidden">
                          {video.poster ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center" 
                              style={{ '--bg-image': `url(${video.poster})`, backgroundImage: 'var(--bg-image)' } as React.CSSProperties}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium truncate max-w-[250px]">{video.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-foreground/70">{video.category || 'Uncategorized'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        video.published 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {video.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-foreground/70">{formatDate(video.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="relative inline-block">
                        <button 
                          className="p-2 hover:bg-muted rounded-full"
                          onClick={() => handleToggleActionMenu(video.id)}
                          aria-label="Open video actions menu"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showActionMenu === video.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-card shadow-lg rounded-md border border-border py-1 z-10">
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                              onClick={() => handleEditVideo(video.id)}
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                              onClick={() => togglePublish(video.id, video.published)}
                            >
                              <Eye className="w-4 h-4" />
                              {video.published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted text-red-500"
                              onClick={() => handleDelete(video.id)}
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
                
                {filteredVideos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground/50">
                      {searchQuery 
                        ? "No videos match your search" 
                        : filter !== 'all' 
                          ? `No ${filter} videos found` 
                          : "No videos found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
} 