'use client';

import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, UserPlus, Calendar, Filter, Download, ToggleLeft, ToggleRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
  active: boolean;
}

export default function NewsletterSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch subscribers from API
  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filter subscribers based on search and filter criteria
  useEffect(() => {
    let filtered = subscribers;

    // Apply active/inactive filter
    if (filter === 'active') {
      filtered = filtered.filter(subscriber => subscriber.active);
    } else if (filter === 'inactive') {
      filtered = filtered.filter(subscriber => !subscriber.active);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubscribers(filtered);
  }, [subscribers, filter, searchTerm]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter');

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data);
      } else {
        setError('Failed to fetch newsletter subscribers');
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (subscriberId: string, active: boolean) => {
    try {
      const response = await fetch(`/api/newsletter/${subscriberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active }),
      });

      if (response.ok) {
        setSubscribers(prev => prev.map(subscriber =>
          subscriber.id === subscriberId ? { ...subscriber, active } : subscriber
        ));
      }
    } catch (error) {
      console.error('Error updating subscriber status:', error);
    }
  };

  const deleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter/${subscriberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubscribers(prev => prev.filter(subscriber => subscriber.id !== subscriberId));
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const exportSubscribers = () => {
    const csvContent = [
      'Email,Subscription Date,Status',
      ...filteredSubscribers.map(subscriber =>
        `${subscriber.email},${new Date(subscriber.createdAt).toLocaleDateString()},${subscriber.active ? 'Active' : 'Inactive'}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeCount = subscribers.filter(subscriber => subscriber.active).length;
  const thisWeekCount = subscribers.filter(subscriber => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(subscriber.createdAt) > weekAgo;
  }).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading newsletter subscribers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchSubscribers}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-heading">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">
            Manage newsletter subscribers and track engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSubscribers}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchSubscribers}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <UserPlus className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
              <p className="text-2xl font-bold text-heading">{subscribers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-heading">{activeCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <ToggleLeft className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inactive</p>
              <p className="text-2xl font-bold text-heading">{subscribers.length - activeCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-heading">{thisWeekCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <label htmlFor="subscriber-filter" className="sr-only">Filter subscribers</label>
            <select
              id="subscriber-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Subscribers</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Subscribers List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subscribers ({filteredSubscribers.length})</h2>
        </div>

        {filteredSubscribers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No newsletter subscribers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subscription Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="font-medium text-heading">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {formatDate(subscriber.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${subscriber.active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                        {subscriber.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSubscriberStatus(subscriber.id, !subscriber.active)}
                        >
                          {subscriber.active ? (
                            <>
                              <ToggleLeft className="h-4 w-4 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleRight className="h-4 w-4 mr-1" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSubscriber(subscriber.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}