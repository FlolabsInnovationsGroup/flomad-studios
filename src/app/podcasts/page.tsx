'use client';

import { useState, useEffect } from 'react';
import { Music, Search, Filter, Calendar } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import PosterImage from '@/components/ui/PosterImage';

interface Podcast {
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
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/podcasts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        
        const data = await response.json();
        setPodcasts(data);
        setFilteredPodcasts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            data
              .map((podcast: Podcast) => podcast.category)
              .filter((category: string | undefined) => category)
          )
        ) as string[];
        
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setError('Failed to load podcasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPodcasts();
  }, []);

  // Apply filters and search
  useEffect(() => {
    const results = podcasts.filter(podcast => {
      // Apply category filter
      if (selectedCategory && podcast.category !== selectedCategory) {
        return false;
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = podcast.title.toLowerCase().includes(query);
        const matchesDescription = podcast.description?.toLowerCase().includes(query) || false;
        const matchesTags = podcast.tags.some(tag => tag.toLowerCase().includes(query));
        
        return matchesTitle || matchesDescription || matchesTags;
      }
      
      return true;
    });
    
    setFilteredPodcasts(results);
  }, [podcasts, selectedCategory, searchQuery]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <main className="fade-in">
      {/* Hero */}
      <Section className="relative overflow-hidden py-24 md:py-32">
        <div className="creative-gradient absolute inset-0 opacity-20" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-radial-gradient-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-radial-gradient-secondary rounded-full animate-pulse opacity-40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-visible">Podcasts</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/90">
              Listen to our latest podcast episodes covering digital design, creativity, and technology.
            </p>
          </div>
        </div>
      </Section>

      {/* Content */}
      <Section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
              <input
                type="text"
                placeholder="Search podcasts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="sm:w-auto w-full flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {selectedCategory && <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">1</span>}
            </Button>
          </div>
          
          {showFilters && (
            <Card className="p-4 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedCategory === null ? 'default' : 'outline'}
                      onClick={() => handleCategorySelect(null)}
                    >
                      All
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category}
                        size="sm"
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="overflow-hidden">
                <div className="animate-pulse">
                  <div className="aspect-square bg-muted"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-5 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-foreground/70 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="mx-auto"
            >
              Try Again
            </Button>
          </Card>
        )}
        
        {/* Empty State */}
        {!loading && !error && filteredPodcasts.length === 0 && (
          <Card className="p-8 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
            <h2 className="text-2xl font-bold mb-4">No podcasts found</h2>
            <p className="text-foreground/70 mb-6">
              {searchQuery || selectedCategory
                ? "No podcasts match your search criteria. Try adjusting your filters."
                : "There are no podcasts available at the moment. Please check back later."}
            </p>
            {(searchQuery || selectedCategory) && (
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mx-auto"
              >
                Clear Filters
              </Button>
            )}
          </Card>
        )}
        
        {/* Podcasts Grid */}
        {!loading && !error && filteredPodcasts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPodcasts.map(podcast => (
              <Link 
                href={`/podcasts/${podcast.id}`} 
                key={podcast.id}
                className="group"
              >
                <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {podcast.poster ? (
                      <PosterImage
                        src={podcast.poster}
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        alt={`${podcast.title} poster`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-glass-primary flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <Music className="h-12 w-12 text-foreground/30" />
                      </div>
                    )}
                    
                    {podcast.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                          {podcast.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {podcast.title}
                    </h2>
                    
                    {podcast.description && (
                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                        {podcast.description}
                      </p>
                    )}
                    
                    <div className="mt-auto flex items-center text-sm text-foreground/60">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(podcast.createdAt)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
        </div>
      </Section>
    </main>
  );
}
