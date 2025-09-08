'use client';

import { useState } from 'react';
import { Calendar, Video, Podcast, FileText, ChevronLeft, ChevronRight, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data for scheduled content
const mockScheduledContent = [
  {
    id: '1',
    title: 'How to Create an Effective Design System',
    date: '2024-01-02',
    time: '09:00',
    type: 'blog',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Brand Design Process Walkthrough',
    date: '2024-01-04',
    time: '14:30',
    type: 'video',
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Design Principles for Effective UX',
    date: '2024-01-08',
    time: '11:00',
    type: 'podcast',
    status: 'scheduled',
  },
  {
    id: '4',
    title: 'UI/UX Design Principles for Beginners',
    date: '2024-01-10',
    time: '16:00',
    type: 'video',
    status: 'scheduled',
  },
  {
    id: '5',
    title: 'The Future of Interactive Web Experiences',
    date: '2024-01-12',
    time: '10:30',
    type: 'blog',
    status: 'draft',
  },
  {
    id: '6',
    title: 'Client Communication Masterclass',
    date: '2024-01-15',
    time: '13:00',
    type: 'podcast',
    status: 'draft',
  },
  {
    id: '7',
    title: 'Latest Web Design Trends 2024',
    date: '2024-01-18',
    time: '15:00',
    type: 'video',
    status: 'draft',
  },
];

// Helper to get all days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper to get the day of week for the first day of the month
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

// Helper for content type icon
const getContentTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'podcast':
      return <Podcast className="h-4 w-4" />;
    case 'blog':
      return <FileText className="h-4 w-4" />;
    default:
      return null;
  }
};

// Helper for content type color
const getContentTypeColor = (type: string) => {
  switch (type) {
    case 'video':
      return 'bg-blue-500/10 text-blue-500';
    case 'podcast':
      return 'bg-purple-500/10 text-purple-500';
    case 'blog':
      return 'bg-green-500/10 text-green-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

export default function ContentCalendarPage() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [scheduledContent, setScheduledContent] = useState(mockScheduledContent);
  const [showEventMenu, setShowEventMenu] = useState<string | null>(null);

  // Names of months and days
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get days info for the calendar
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setShowEventMenu(null);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setShowEventMenu(null);
  };

  // Format date as YYYY-MM-DD
  const formatDateString = (day: number) => {
    const month = selectedMonth + 1; // JavaScript months are 0-indexed
    return `${selectedYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  // Delete event
  const handleDeleteEvent = (id: string) => {
    setScheduledContent(scheduledContent.filter(event => event.id !== id));
    setShowEventMenu(null);
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    );
  };

  // Create content types for filtering
  const contentTypes = ['All', 'Video', 'Podcast', 'Blog'];
  const [selectedType, setSelectedType] = useState('All');

  // Filter events by content type
  const filteredEvents = selectedType === 'All'
    ? scheduledContent
    : scheduledContent.filter(event => event.type === selectedType.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-foreground/70 mt-1">Schedule and plan your upcoming content</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            // TODO: Implement new event modal
            console.log('Schedule content clicked');
          }}
        >
          <Plus size={16} />
          Schedule Content
        </Button>
      </div>

      {/* Content Type Filter */}
      <div className="flex gap-2">
        {contentTypes.map(type => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type)}
          >
            {type === 'All' ? (
              'All'
            ) : (
              <div className="flex items-center gap-2">
                {type === 'Video' && <Video className="h-3.5 w-3.5" />}
                {type === 'Podcast' && <Podcast className="h-3.5 w-3.5" />}
                {type === 'Blog' && <FileText className="h-3.5 w-3.5" />}
                {type}
              </div>
            )}
          </Button>
        ))}
      </div>

      {/* Calendar */}
      <Card className="overflow-hidden">
        {/* Calendar Header with Month/Year Navigation */}
        <div className="bg-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{monthNames[selectedMonth]} {selectedYear}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-full hover:bg-primary/10"
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-primary/10"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Day names */}
          {dayNames.map((day, index) => (
            <div key={index} className="p-2 text-center text-sm font-medium border-b border-border">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2 min-h-[120px] border-b border-r border-border bg-muted/5"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateString = formatDateString(day);
            const eventsForDay = filteredEvents.filter(event => event.date === dateString);
            
            return (
              <div 
                key={`day-${day}`} 
                className={`p-2 min-h-[120px] border-b border-r border-border relative ${
                  isToday(day) ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex justify-between">
                  <span className={`text-sm font-medium ${isToday(day) ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                    {day}
                  </span>
                  {eventsForDay.length > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                      {eventsForDay.length}
                    </span>
                  )}
                </div>

                <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {eventsForDay.map(event => (
                    <div 
                      key={event.id} 
                      className={`text-xs p-1 rounded ${getContentTypeColor(event.type)} flex items-center justify-between group cursor-pointer`}
                    >
                      <div className="flex items-center truncate">
                        <span className="mr-1">
                          {getContentTypeIcon(event.type)}
                        </span>
                        <span className="truncate">{event.title}</span>
                      </div>
                      <button
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-black/10 rounded"
                        onClick={() => setShowEventMenu(event.id === showEventMenu ? null : event.id)}
                        aria-label="Event options"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </button>
                      
                      {showEventMenu === event.id && (
                        <div className="absolute right-2 mt-5 w-32 bg-card shadow-lg rounded-md border border-border py-1 z-10">
                          <button 
                            className="w-full px-3 py-1.5 text-left text-xs flex items-center gap-2 hover:bg-muted"
                            onClick={() => alert(`Edit ${event.title}`)}
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </button>
                          <button 
                            className="w-full px-3 py-1.5 text-left text-xs flex items-center gap-2 hover:bg-muted text-red-500"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Schedule List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Schedule</h2>
        <div className="space-y-4">
          {filteredEvents
            .filter(event => new Date(`${event.date}T${event.time}`) >= new Date())
            .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="flex items-center p-3 hover:bg-muted/5 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getContentTypeColor(event.type)}`}>
                  {getContentTypeIcon(event.type)}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-foreground/60">
                    {new Date(`${event.date}T${event.time}`).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${event.status === 'scheduled' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {event.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                </span>
              </div>
            ))}
            
          {filteredEvents.filter(event => new Date(`${event.date}T${event.time}`) >= new Date()).length === 0 && (
            <div className="text-center py-8 text-foreground/50">
              No upcoming scheduled content
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 