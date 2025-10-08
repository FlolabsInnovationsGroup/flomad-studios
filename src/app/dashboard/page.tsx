'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Plus, Video, Podcast, FileText, Calendar, BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { EnhancedGrid } from '@/components/ui/EnhancedGrid';
import EnhancedCard from '@/components/ui/EnhancedCard';
import Link from 'next/link';

// Types for API data
interface AnalyticsData {
  totalViews: { value: number; change: number; trend: 'up' | 'down' };
  subscribers: { value: number; change: number; trend: 'up' | 'down' };
  averageWatchTime: { value: string; change: number; trend: 'up' | 'down' };
  engagementRate: { value: string; change: number; trend: 'up' | 'down' };
  totalContent: number;
  publishedContent: number;
  totalUsers: number;
}

interface ContentItem {
  id: string;
  title: string;
  createdAt: string;
  published: boolean;
  user?: { name: string | null; email: string };
}

// Weekly views data for chart
const weeklyViewsData = [
  { day: 'Mon', views: 12453 },
  { day: 'Tue', views: 14582 },
  { day: 'Wed', views: 18921 },
  { day: 'Thu', views: 15673 },
  { day: 'Fri', views: 16824 },
  { day: 'Sat', views: 19452 },
  { day: 'Sun', views: 17893 }
];

// Enhanced content data
const recentVideos = [
  { 
    id: '1', 
    title: 'UI/UX Design Principles for Beginners', 
    description: 'Learn the fundamental principles that make great user interfaces',
    type: 'video' as const,
    thumbnail: '/images/video1.jpg',
    publishDate: '2023-12-15',
    status: 'published' as const,
    metrics: { views: 12453, likes: 892, duration: '15:32' },
    tags: ['UI/UX', 'Design', 'Beginner']
  },
  { 
    id: '2', 
    title: 'Brand Design Process Walkthrough', 
    description: 'A complete guide to building a brand identity from scratch',
    type: 'video' as const,
    thumbnail: '/images/video2.jpg',
    publishDate: '2023-12-10',
    status: 'published' as const,
    metrics: { views: 8732, likes: 654, duration: '22:15' },
    tags: ['Branding', 'Process', 'Design']
  },
  { 
    id: '3', 
    title: 'Latest Web Design Trends 2024', 
    description: 'Explore the cutting-edge trends shaping web design',
    type: 'video' as const,
    publishDate: '2024-01-05',
    status: 'draft' as const,
    metrics: { duration: '18:45' },
    tags: ['Web Design', 'Trends', '2024']
  },
];

const recentPodcasts = [
  { 
    id: '1', 
    title: 'Design Principles for Effective UX', 
    description: 'Deep dive into UX principles with industry experts',
    type: 'podcast' as const,
    publishDate: '2023-12-12',
    status: 'published' as const,
    metrics: { views: 5423, likes: 234, duration: '45:20' },
    tags: ['UX', 'Principles', 'Interview']
  },
  { 
    id: '2', 
    title: 'Client Communication Masterclass', 
    description: 'Master the art of client relationships and communication',
    type: 'podcast' as const,
    publishDate: '2024-01-15',
    status: 'scheduled' as const,
    metrics: { duration: '38:15' },
    tags: ['Client', 'Communication', 'Business']
  },
];



// Helper functions
const getTrendColor = (trend: string) => {
  return trend === 'up' ? 'text-green-500' : 'text-red-500';
};

const getTrendIcon = (trend: string) => {
  return trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
};

const getMaxViews = () => {
  return Math.max(...weeklyViewsData.map((day: { views: number }) => day.views));
};

const getBarHeight = (views: number) => {
  const maxViews = getMaxViews();
  return `${(views / maxViews) * 100}%`;
};

export default function DashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [recentVideos, setRecentVideos] = useState<ContentItem[]>([]);
  const [recentPodcasts, setRecentPodcasts] = useState<ContentItem[]>([]);
  const [recentPosts, setRecentPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        setAnalyticsData(data.analytics);
        setRecentVideos(data.recentContent.videos);
        setRecentPodcasts(data.recentContent.podcasts);
        setRecentPosts(data.recentContent.posts);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  
  // Handler functions for timeRange buttons
  const handleTimeRangeChange = (range: 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-foreground/70">Loading dashboard data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} variant="glass-elevated" className="p-6 animate-pulse">
              <div className="h-20 bg-muted/20 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }
  
  return (
    <div className="min-h-screen relative">
      {/* Main content with enhanced spacing and modern design */}
      <div className="space-y-8 relative z-10">
        {/* Enhanced header section with gradients and modern styling */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-500 via-emerald-400 to-yellow-400 bg-clip-text text-transparent text-enhanced-strong">
              Creative Dashboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl drop-shadow-sm text-enhanced-readable">
              Monitor your creative journey, track performance, and manage your content with modern analytics
            </p>
          </div>
          
          {/* Enhanced action buttons with glass effects */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link href="/dashboard/videos/upload">
              <Button className="glass-elevated hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-sky-500 to-emerald-500 border-0 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3">
                <Video className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Upload Video
              </Button>
            </Link>
            <Link href="/dashboard/podcasts/upload">
              <Button variant="outline" className="glass-subtle hover:scale-105 hover:shadow-md transition-all duration-300 border-white/20 hover:bg-white/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3">
                <Podcast className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                New Podcast
              </Button>
            </Link>
            <Link href="/dashboard/blog/new">
              <Button variant="outline" className="glass-subtle hover:scale-105 hover:shadow-md transition-all duration-300 border-white/20 hover:bg-white/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3">
                <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Write Article
              </Button>
            </Link>
          </div>
        </div>
      
      {/* Enhanced Analytics Cards with modern glass design */}
      <EnhancedGrid columns={4} gap="md" staggered hover3d>
        <EnhancedCard variant="interactive" hover3D glowOnHover className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/60">Total Views</span>
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <BarChart2 className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{analyticsData.totalViews.value.toLocaleString()}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.totalViews.trend)}`}>
              {getTrendIcon(analyticsData.totalViews.trend)}
              <span>{analyticsData.totalViews.change}%</span>
            </div>
          </div>
          <p className="text-xs text-white/50">+2.4k from last week</p>
        </EnhancedCard>
        
        <EnhancedCard variant="interactive" hover3D glowOnHover className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/60">Subscribers</span>
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{analyticsData.subscribers.value.toLocaleString()}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.subscribers.trend)}`}>
              {getTrendIcon(analyticsData.subscribers.trend)}
              <span>{analyticsData.subscribers.change}%</span>
            </div>
          </div>
          <p className="text-xs text-white/50">+180 new this week</p>
        </EnhancedCard>
        
        <EnhancedCard variant="interactive" hover3D glowOnHover className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/60">Avg. Watch Time</span>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{analyticsData.averageWatchTime.value}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.averageWatchTime.trend)}`}>
              {getTrendIcon(analyticsData.averageWatchTime.trend)}
              <span>{Math.abs(analyticsData.averageWatchTime.change)}%</span>
            </div>
          </div>
          <p className="text-xs text-white/50">Audience retention</p>
        </EnhancedCard>
        
        <EnhancedCard variant="interactive" hover3D glowOnHover className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/60">Engagement Rate</span>
            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{analyticsData.engagementRate.value}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.engagementRate.trend)}`}>
              {getTrendIcon(analyticsData.engagementRate.trend)}
              <span>{analyticsData.engagementRate.change}%</span>
            </div>
          </div>
          <p className="text-xs text-white/50">Likes, comments, shares</p>
        </EnhancedCard>
      </EnhancedGrid>
      
      {/* Views Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Views Overview</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleTimeRangeChange('week')}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleTimeRangeChange('month')}
            >
              Month
            </Button>
            <Button 
              variant={timeRange === 'year' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleTimeRangeChange('year')}
            >
              Year
            </Button>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between">
          {weeklyViewsData.map((day: { day: string; views: number }, index: number) => {
            const heightPercentage = getBarHeight(day.views);
            const heightClass = `h-[${heightPercentage}]`;
            
            return (
              <div key={index} className="flex flex-col items-center w-full">
                <div className="w-full px-1 flex justify-center">
                  <div className="w-full max-w-[50px] bg-primary/10 rounded-t-sm relative overflow-hidden h-48">
                    <div 
                      className={`bg-primary rounded-t-sm absolute bottom-0 w-full transition-all duration-500 ease-out ${heightClass}`}
                    />
                  </div>
                </div>
                <div className="text-xs mt-2 text-foreground/70">{day.day}</div>
                <div className="text-xs font-medium">{(day.views / 1000).toFixed(1)}k</div>
              </div>
            );
          })}
        </div>
      </Card>
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Videos */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <h2 className="text-base sm:text-lg font-bold text-enhanced-strong">Recent Videos</h2>
            </div>
            <Button asChild size="sm" variant="outline" className="flex items-center gap-1">
              <Link href="/dashboard/videos">
                <span>View All</span>
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentVideos.map(video => (
              <div key={video.id} className="p-2 hover:bg-muted/5 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{video.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${video.published ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {video.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>By {video.user?.name || 'Unknown'}</span>
                  <span>{new Date(video.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
            
            <Button asChild className="w-full flex items-center justify-center gap-1 mt-4" size="sm">
              <Link href="/dashboard/videos/upload">
                <Plus size={16} />
                Upload New Video
              </Link>
            </Button>
          </div>
        </Card>
        
        {/* Podcasts */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Podcast className="h-5 w-5 text-sky-500" />
              <h2 className="text-lg font-bold">Recent Podcasts</h2>
            </div>
            <Button asChild size="sm" variant="outline" className="flex items-center gap-1">
              <Link href="/dashboard/podcasts">
                <span>View All</span>
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentPodcasts.map(podcast => (
              <div key={podcast.id} className="p-2 hover:bg-muted/5 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{podcast.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${podcast.published ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {podcast.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>By {podcast.user?.name || 'Unknown'}</span>
                  <span>{new Date(podcast.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
            
            <Button asChild className="w-full flex items-center justify-center gap-1 mt-4" size="sm">
              <Link href="/dashboard/podcasts/new-episode">
                <Plus size={16} />
                New Episode
              </Link>
            </Button>
          </div>
        </Card>
        
        {/* Blog Posts */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-bold">Recent Blog Posts</h2>
            </div>
            <Button asChild size="sm" variant="outline" className="flex items-center gap-1">
              <Link href="/dashboard/blog">
                <span>View All</span>
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="p-2 hover:bg-muted/5 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>By {post.user?.name || 'Unknown'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
            
            <Button asChild className="w-full flex items-center justify-center gap-1 mt-4" size="sm">
              <Link href="/dashboard/blog/new">
                <Plus size={16} />
                New Blog Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Link href="/dashboard/videos/upload">
              <Video className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Upload Video</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Link href="/dashboard/podcasts/new-episode">
              <Podcast className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">New Podcast</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Link href="/dashboard/blog/new">
              <FileText className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Write Blog Post</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Link href="/dashboard/calendar">
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Schedule Content</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  </div>
  );
} 
