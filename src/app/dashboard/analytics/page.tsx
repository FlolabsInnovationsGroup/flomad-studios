'use client';

import { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  ArrowUp, 
  ArrowDown,
  Video,
  Podcast,
  FileText,
  Download
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data for analytics
const overviewData = {
  totalViews: { value: 12500, previousValue: 10800, percentChange: 15.7 },
  totalWatchTime: { value: 45280, previousValue: 38760, percentChange: 16.8 }, // seconds
  averageWatchTime: { value: 278, previousValue: 292, percentChange: -4.8 }, // seconds
  engagementRate: { value: 24.8, previousValue: 22.3, percentChange: 11.2 }, // percentage
};

const contentPerformance = [
  { title: 'Design System Basics', type: 'video', views: 850, engagement: 28.3, watchTime: 345 },
  { title: 'Studio Workflow', type: 'blog', views: 620, engagement: 32.1, watchTime: 0 },
];

const deviceData = [
  { device: 'Desktop', percentage: 46.2 },
  { device: 'Mobile', percentage: 42.5 },
  { device: 'Tablet', percentage: 11.3 },
];

const locationData = [
  { country: 'United States', views: 4200, percentage: 33.6 },
  { country: 'United Kingdom', views: 2100, percentage: 16.8 },
  { country: 'Canada', views: 1800, percentage: 14.4 },
  { country: 'Other', views: 73859, percentage: 17.8 },
];

const monthlyData = [
  { month: 'Jan', views: 32450, engagement: 22.3 },
  { month: 'Feb', views: 35670, engagement: 21.9 },
  { month: 'Mar', views: 39210, engagement: 23.2 },
  { month: 'Apr', views: 41560, engagement: 24.5 },
  { month: 'May', views: 38970, engagement: 25.3 },
  { month: 'Jun', views: 42780, engagement: 26.1 },
  { month: 'Jul', views: 45630, engagement: 26.8 },
  { month: 'Aug', views: 48920, engagement: 27.4 },
  { month: 'Sep', views: 52340, engagement: 28.9 },
  { month: 'Oct', views: 56780, engagement: 29.5 },
  { month: 'Nov', views: 59820, engagement: 30.2 },
  { month: 'Dec', views: 61890, engagement: 31.7 },
];

const trafficSources = [
  { source: 'Direct', percentage: 28.4 },
  { source: 'Social Media', percentage: 32.6 },
  { source: 'Search', percentage: 25.3 },
  { source: 'Referral', percentage: 10.2 },
  { source: 'Email', percentage: 3.5 },
];

// Helper functions
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else {
    return `${minutes}m ${seconds % 60}s`;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

const getChangeColor = (percentChange: number) => {
  return percentChange >= 0 ? 'text-green-500' : 'text-red-500';
};

const getChangeIcon = (percentChange: number) => {
  return percentChange >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
};

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4 text-blue-500" />;
    case 'podcast':
      return <Podcast className="h-4 w-4 text-purple-500" />;
    case 'blog':
      return <FileText className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [contentType, setContentType] = useState<'all' | 'video' | 'podcast' | 'blog'>('all');
  
  const filteredContent = contentType === 'all' 
    ? contentPerformance
    : contentPerformance.filter(item => item.type === contentType);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-foreground/70 mt-1">Track your content performance and audience insights</p>
      </div>
      
      {/* Date Range & Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7d')}
          >
            Last 7 days
          </Button>
          <Button
            variant={dateRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('30d')}
          >
            Last 30 days
          </Button>
          <Button
            variant={dateRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('90d')}
          >
            Last 90 days
          </Button>
          <Button
            variant={dateRange === '12m' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('12m')}
          >
            Last 12 months
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={contentType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setContentType('all')}
          >
            All Content
          </Button>
          <Button
            variant={contentType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setContentType('video')}
            className="flex items-center gap-1"
          >
            <Video className="h-3.5 w-3.5" />
            Videos
          </Button>
          <Button
            variant={contentType === 'podcast' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setContentType('podcast')}
            className="flex items-center gap-1"
          >
            <Podcast className="h-3.5 w-3.5" />
            Podcasts
          </Button>
          <Button
            variant={contentType === 'blog' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setContentType('blog')}
            className="flex items-center gap-1"
          >
            <FileText className="h-3.5 w-3.5" />
            Blog Posts
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground/70">Total Views</span>
              <BarChart2 className="h-5 w-5 text-primary/80" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatNumber(overviewData.totalViews.value)}</span>
              <div className={`flex items-center gap-1 text-sm ${getChangeColor(overviewData.totalViews.percentChange)}`}>
                {getChangeIcon(overviewData.totalViews.percentChange)}
                <span>{Math.abs(overviewData.totalViews.percentChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-1">vs previous period</p>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground/70">Total Watch Time</span>
              <Clock className="h-5 w-5 text-primary/80" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatTime(overviewData.totalWatchTime.value)}</span>
              <div className={`flex items-center gap-1 text-sm ${getChangeColor(overviewData.totalWatchTime.percentChange)}`}>
                {getChangeIcon(overviewData.totalWatchTime.percentChange)}
                <span>{Math.abs(overviewData.totalWatchTime.percentChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-1">vs previous period</p>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground/70">Avg. Watch Time</span>
              <Clock className="h-5 w-5 text-primary/80" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatTime(overviewData.averageWatchTime.value)}</span>
              <div className={`flex items-center gap-1 text-sm ${getChangeColor(overviewData.averageWatchTime.percentChange)}`}>
                {getChangeIcon(overviewData.averageWatchTime.percentChange)}
                <span>{Math.abs(overviewData.averageWatchTime.percentChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-1">vs previous period</p>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground/70">Engagement Rate</span>
              <TrendingUp className="h-5 w-5 text-primary/80" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{overviewData.engagementRate.value}%</span>
              <div className={`flex items-center gap-1 text-sm ${getChangeColor(overviewData.engagementRate.percentChange)}`}>
                {getChangeIcon(overviewData.engagementRate.percentChange)}
                <span>{Math.abs(overviewData.engagementRate.percentChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-1">vs previous period</p>
          </div>
        </Card>
      </div>
      
      {/* Monthly Performance Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Monthly Performance</h2>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <a href="#">
              <Download className="h-3.5 w-3.5" />
              Export Data
            </a>
          </Button>
        </div>
        
        <div className="h-64">
          <div className="relative h-full">
            {/* View Count Bars */}
            <div className="absolute inset-0 flex items-end justify-between">
              {monthlyData.map((month, i) => {
                const maxViews = Math.max(...monthlyData.map(m => m.views));
                const height = `${(month.views / maxViews) * 100}%`;
                
                return (
                  <div key={i} className="flex flex-col items-center w-full">
                    <div className="w-full px-1.5 flex justify-center">
                      <div className="w-full max-w-[24px] group relative">
                        <div 
                          className="w-full bg-primary rounded-t-sm transition-all duration-500 ease-out"
                          style={{ height }}
                        />
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-background border border-border px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                          {formatNumber(month.views)} views
                        </div>
                      </div>
                    </div>
                    <div className="text-xs mt-2 text-foreground/70">{month.month}</div>
                  </div>
                );
              })}
            </div>
            
            {/* Engagement Rate Line */}
            <div className="absolute inset-0 flex items-end justify-between">
              <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
                <polyline
                  points={monthlyData.map((month, i) => {
                    const x = (i / (monthlyData.length - 1)) * 1200;
                    const y = (1 - month.engagement / 40) * 280;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-green-500"
                />
                {monthlyData.map((month, i) => {
                  const x = (i / (monthlyData.length - 1)) * 1200;
                  const y = (1 - month.engagement / 40) * 280;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-green-500"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-sm text-foreground/70">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/70">Engagement Rate (%)</span>
          </div>
        </div>
      </Card>
      
      {/* Top Content Performance Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Top Performing Content</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Content</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-right p-4 font-medium">Views</th>
                <th className="text-right p-4 font-medium">Engagement</th>
                <th className="text-right p-4 font-medium">Watch Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/5">
                  <td className="p-4 max-w-xs">
                    <div className="truncate">{item.title}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(item.type)}
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">{formatNumber(item.views)}</td>
                  <td className="p-4 text-right">{item.engagement}%</td>
                  <td className="p-4 text-right">
                    {item.type === 'blog' ? '—' : formatTime(item.watchTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Device Breakdown</h2>
          <div className="space-y-4">
            {deviceData.map((device, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-blue-500" />}
                    {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-green-500" />}
                    {device.device === 'Tablet' && <Monitor className="h-4 w-4 text-purple-500" />}
                    {device.device === 'Other' && <Globe className="h-4 w-4 text-gray-500" />}
                    <span>{device.device}</span>
                  </div>
                  <span className="font-medium">{device.percentage}%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      device.device === 'Desktop' ? 'bg-blue-500' : 
                      device.device === 'Mobile' ? 'bg-green-500' : 
                      device.device === 'Tablet' ? 'bg-purple-500' : 
                      'bg-gray-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Traffic Sources */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{source.source}</span>
                  <span className="font-medium">{source.percentage}%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      i === 0 ? 'bg-blue-500' : 
                      i === 1 ? 'bg-green-500' : 
                      i === 2 ? 'bg-purple-500' : 
                      i === 3 ? 'bg-amber-500' : 
                      'bg-gray-500'
                    }`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Geographic Distribution */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Geographic Distribution</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Country</th>
                <th className="text-right p-4 font-medium">Views</th>
                <th className="text-right p-4 font-medium">Percentage</th>
                <th className="text-left p-4 font-medium w-1/3">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {locationData.map((location, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/5">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-foreground/70" />
                      <span>{location.country}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">{formatNumber(location.views)}</td>
                  <td className="p-4 text-right">{location.percentage}%</td>
                  <td className="p-4">
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 