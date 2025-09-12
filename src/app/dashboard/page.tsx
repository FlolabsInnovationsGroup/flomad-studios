'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Video, Podcast, FileText, Calendar, BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Mock analytics data with enhanced metrics
const analyticsData = {
  totalViews: {
    value: 487923,
    change: 12.5,
    trend: 'up' as const
  },
  subscribers: {
    value: 15782,
    change: 8.3,
    trend: 'up' as const
  },
  averageWatchTime: {
    value: '4:35',
    change: -2.1,
    trend: 'down' as const
  },
  engagementRate: {
    value: '24.8%',
    change: 5.7,
    trend: 'up' as const
  }
};

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

const recentBlogPosts = [
  { 
    id: '1', 
    title: 'How to Create an Effective Design System', 
    description: 'Step-by-step guide to building scalable design systems',
    type: 'blog' as const,
    publishDate: '2023-11-28',
    status: 'published' as const,
    metrics: { views: 2567, likes: 89, readTime: '8 min read' },
    tags: ['Design System', 'Guidelines', 'Process']
  },
  { 
    id: '2', 
    title: 'The Future of Interactive Web Experiences', 
    description: 'Exploring emerging technologies in web interaction',
    type: 'blog' as const,
    publishDate: '2023-10-15',
    status: 'published' as const,
    metrics: { views: 1845, likes: 67, readTime: '12 min read' },
    tags: ['Web', 'Interactive', 'Future']
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
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  
  // Handler functions for timeRange buttons
  const handleTimeRangeChange = (range: 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Main content with enhanced spacing and modern design */}
      <div className="space-y-8 relative z-10">
        {/* Enhanced header section with gradients and modern styling */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-500 via-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Creative Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl drop-shadow-sm">
              Monitor your creative journey, track performance, and manage your content with modern analytics
            </p>
          </div>
          
          {/* Enhanced action buttons with glass effects */}
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/videos/upload">
              <Button className="glass-elevated hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-sky-500 to-emerald-500 border-0">
                <Video className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
            </Link>
            <Link href="/dashboard/podcasts/upload">
              <Button variant="outline" className="glass-subtle hover:scale-105 hover:shadow-md transition-all duration-300 border-white/20 hover:bg-white/10">
                <Podcast className="mr-2 h-4 w-4" />
                New Podcast
              </Button>
            </Link>
            <Link href="/dashboard/blog/new">
              <Button variant="outline" className="glass-subtle hover:scale-105 hover:shadow-md transition-all duration-300 border-white/20 hover:bg-white/10">
                <FileText className="mr-2 h-4 w-4" />
                Write Article
              </Button>
            </Link>
          </div>
        </div>
      
      {/* Enhanced Analytics Cards with modern glass design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass-elevated" className="p-6 group">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Views</span>
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">{analyticsData.totalViews.value.toLocaleString()}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.totalViews.trend)}`}>
                {getTrendIcon(analyticsData.totalViews.trend)}
                <span>{analyticsData.totalViews.change}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">+2.4k from last week</p>
          </div>
        </Card>
        
        <Card variant="glass-elevated" className="p-6 group">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Subscribers</span>
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500/30 transition-colors">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">{analyticsData.subscribers.value.toLocaleString()}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.subscribers.trend)}`}>
                {getTrendIcon(analyticsData.subscribers.trend)}
                <span>{analyticsData.subscribers.change}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">+180 new this week</p>
          </div>
        </Card>
        
        <Card variant="glass-elevated" className="p-6 group">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Avg. Watch Time</span>
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">{analyticsData.averageWatchTime.value}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.averageWatchTime.trend)}`}>
                {getTrendIcon(analyticsData.averageWatchTime.trend)}
                <span>{Math.abs(analyticsData.averageWatchTime.change)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Audience retention</p>
          </div>
        </Card>
        
        <Card variant="glass-elevated" className="p-6 group">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Engagement Rate</span>
              <div className="p-2 rounded-lg bg-pink-500/20 text-pink-600 dark:text-pink-400 group-hover:bg-pink-500/30 transition-colors">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">{analyticsData.engagementRate.value}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(analyticsData.engagementRate.trend)}`}>
                {getTrendIcon(analyticsData.engagementRate.trend)}
                <span>{analyticsData.engagementRate.change}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Likes, comments, shares</p>
          </div>
        </Card>
      </div>
      
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Videos */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-bold">Recent Videos</h2>
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
                  <span className={`text-xs px-2 py-0.5 rounded-full ${video.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {video.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>{video.status === 'published' && video.metrics.views ? `${video.metrics.views.toLocaleString()} views` : 'Not published'}</span>
                  <span>{new Date(video.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
                  <span className={`text-xs px-2 py-0.5 rounded-full ${podcast.status === 'published' ? 'bg-green-500/10 text-green-500' : podcast.status === 'scheduled' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {podcast.status === 'published' ? 'Published' : podcast.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>{podcast.status === 'published' && podcast.metrics.views ? `${podcast.metrics.views.toLocaleString()} plays` : 'Not published'}</span>
                  <span>{new Date(podcast.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
            {recentBlogPosts.map(post => (
              <div key={post.id} className="p-2 hover:bg-muted/5 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>{post.status === 'published' && post.metrics.views ? `${post.metrics.views.toLocaleString()} views` : 'Not published'}</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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