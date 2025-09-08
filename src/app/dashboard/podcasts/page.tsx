'use client';

import { useState, useEffect } from 'react';
import { Music, MoreVertical, Edit, Trash2, Eye, Upload, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define the Podcast type
interface PodcastData {
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
  plays?: number; // This might come from analytics
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch podcasts from the API
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/podcasts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setError('Failed to load podcasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts
    .filter(podcast => {
      if (filter === 'all') return true;
      if (filter === 'published') return podcast.published;
      if (filter === 'drafts') return !podcast.published;
      return true;
    })
    .filter(podcast => 
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Handler functions
  const handleToggleActionMenu = (id: string) => {
    setShowActionMenu(showActionMenu === id ? null : id);
  };

  const handleEditPodcast = (id: string) => {
    router.push(`/dashboard/podcasts/edit/${id}`);
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/podcasts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete podcast');
      }
      
      // Remove from state
      setPodcasts(podcasts.filter(podcast => podcast.id !== id));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error deleting podcast:', err);
      alert('Failed to delete podcast. Please try again.');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/podcasts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !currentStatus,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update podcast');
      }
      
      const updatedPodcast = await response.json();
      
      // Update in state
      setPodcasts(podcasts.map(podcast => 
        podcast.id === id ? updatedPodcast : podcast
      ));
      setShowActionMenu(null);
    } catch (err) {
      console.error('Error updating podcast:', err);
      alert('Failed to update podcast. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Podcasts</h1>
          <p className="text-foreground/70 mt-1">Manage your podcast content</p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/podcasts/upload">
            <Upload size={16} />
            Upload Podcast
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
            placeholder="Search podcasts..."
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

      {/* Podcast List */}
      {!loading && !error && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-4 font-medium">Podcast</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPodcasts.map((podcast) => (
                  <tr key={podcast.id} className="border-b border-border hover:bg-muted/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
                          {podcast.poster ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center" 
                              style={{ 
                                backgroundImage: `url(${podcast.poster})`,
                                // Dynamic poster images require inline styles
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Music className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium truncate max-w-[250px] block">{podcast.title}</span>
                          {podcast.description && (
                            <p className="text-foreground/70 text-sm truncate max-w-[300px]">
                              {podcast.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-foreground/70">{podcast.category || 'Uncategorized'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        podcast.published 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {podcast.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-foreground/70">{formatDate(podcast.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="relative inline-block">
                        <button 
                          className="p-2 hover:bg-muted rounded-full"
                          onClick={() => handleToggleActionMenu(podcast.id)}
                          aria-label="Podcast options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showActionMenu === podcast.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-card shadow-lg rounded-md border border-border py-1 z-10">
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                              onClick={() => handleEditPodcast(podcast.id)}
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                              onClick={() => handleTogglePublish(podcast.id, podcast.published)}
                            >
                              <Eye className="w-4 h-4" />
                              {podcast.published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted text-red-500"
                              onClick={() => handleDelete(podcast.id)}
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
                
                {filteredPodcasts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground/50">
                      {searchQuery 
                        ? "No podcasts match your search" 
                        : filter !== 'all' 
                          ? `No ${filter} podcasts found` 
                          : "No podcasts found"}
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