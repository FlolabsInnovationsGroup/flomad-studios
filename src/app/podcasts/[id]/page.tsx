'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, 
  Share2, 
  Tag, 
  Music,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX 
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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

export default function PodcastDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/podcasts/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcast');
        }
        
        const data = await response.json();
        setPodcast(data);
        
        // Initialize audio element
        const audio = new Audio(data.src);
        setAudioElement(audio);
        
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
        
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
        });
        
      } catch (err) {
        console.error('Error fetching podcast:', err);
        setError('Failed to load podcast. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchPodcast();
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
        audioElement.removeEventListener('loadedmetadata', () => {});
        audioElement.removeEventListener('timeupdate', () => {});
        audioElement.removeEventListener('ended', () => {});
      }
    };
  }, [params.id, audioElement]);

  const togglePlay = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioElement) return;
    
    audioElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;
    
    const newVolume = parseFloat(e.target.value);
    audioElement.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;
    
    const seekTime = parseFloat(e.target.value);
    audioElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mb-6"></div>
            <div className="aspect-[16/9] bg-muted rounded mb-8"></div>
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/3 mb-8"></div>
            <div className="h-24 bg-muted rounded mb-8"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-foreground/70 mb-6">{error || 'Podcast not found'}</p>
            <Button 
              onClick={() => router.push('/podcasts')}
              className="mx-auto"
            >
              Back to Podcasts
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/podcasts" 
          className="inline-flex items-center text-foreground/70 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all podcasts
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            {podcast.poster ? (
              <div 
                className="aspect-square rounded-lg bg-cover bg-center shadow-lg" 
                style={{ '--bg-image': `url(${podcast.poster})`, backgroundImage: 'var(--bg-image)' } as React.CSSProperties}
              />
            ) : (
              <div className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center shadow-lg">
                <Music className="h-20 w-20 text-foreground/30" />
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {podcast.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-foreground/70">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(podcast.createdAt)}</span>
              </div>
              
              {podcast.category && (
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {podcast.category}
                  </span>
                </div>
              )}
            </div>
            
            {podcast.description && (
              <div className="mb-8">
                <p className="text-foreground/80 leading-relaxed">
                  {podcast.description}
                </p>
              </div>
            )}
            
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-foreground/70 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {podcast.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-muted rounded-full text-sm text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: podcast.title,
                    text: podcast.description || 'Check out this podcast',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <Card className="p-4 md:p-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlay}
                variant="outline"
                size="sm"
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              
              <div className="flex-1">
                <div className="flex justify-between text-sm text-foreground/70 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-primary h-2 rounded cursor-pointer"
                  aria-label="Audio progress slider"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="sm"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary h-2 rounded cursor-pointer"
                  aria-label="Volume control slider"
                />
              </div>
            </div>
          </div>
        </Card>
        
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">More podcasts you might like</h2>
          
          <div className="text-center py-8">
            <Button 
              onClick={() => router.push('/podcasts')}
              size="lg"
            >
              Explore All Podcasts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 