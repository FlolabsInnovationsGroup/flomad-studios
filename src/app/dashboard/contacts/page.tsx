'use client';

import { useState, useEffect } from 'react';
import { Mail, MailOpen, Clock, User, MessageSquare, Filter, Search, Trash2, Eye, EyeOff } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function ContactSubmissionsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Fetch contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search and filter criteria
  useEffect(() => {
    let filtered = contacts;

    // Apply read/unread filter
    if (filter === 'read') {
      filtered = filtered.filter(contact => contact.read);
    } else if (filter === 'unread') {
      filtered = filtered.filter(contact => !contact.read);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, filter, searchTerm]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact');

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Failed to fetch contact submissions');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId: string, read: boolean) => {
    try {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read }),
      });

      if (response.ok) {
        setContacts(prev => prev.map(contact =>
          contact.id === contactId ? { ...contact, read } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact.id !== contactId));
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
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

  const getSubjectDisplayName = (subject: string) => {
    const subjectMap: Record<string, string> = {
      'technology-inquiry': 'Technology Project Inquiry',
      'ai-robotics': 'AI & Robotics Content',
      'research-communication': 'Research Communication',
      'internship': 'Internship Opportunity',
      'career-change': 'Career Change Program',
      'collaboration': 'Partnership/Collaboration',
      'general': 'General Question',
      'other': 'Other'
    };
    return subjectMap[subject] || subject;
  };

  const unreadCount = contacts.filter(contact => !contact.read).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading contact submissions...</p>
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
          <Button onClick={fetchContacts}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-heading">Contact Submissions</h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <Button onClick={fetchContacts}>
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold text-heading">{contacts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <MailOpen className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold text-heading">{unreadCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-heading">
                {contacts.filter(contact => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(contact.createdAt) > weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <label htmlFor="contact-filter" className="sr-only">Filter messages</label>
            <select
              id="contact-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, subject, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Contact List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List View */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Messages ({filteredContacts.length})</h2>

          {filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No contact submissions found</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedContact?.id === contact.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                    } ${!contact.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {contact.firstName} {contact.lastName}
                        </span>
                        {!contact.read && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{contact.email}</p>
                      <p className="text-sm font-medium text-heading">
                        {getSubjectDisplayName(contact.subject)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Detail View */}
        <Card className="p-6">
          {selectedContact ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Message Details</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(selectedContact.id, !selectedContact.read)}
                  >
                    {selectedContact.read ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Mark Read
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteContact(selectedContact.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <p className="text-heading">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <p className="text-heading">{getSubjectDisplayName(selectedContact.subject)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-heading">{formatDate(selectedContact.createdAt)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <div className="bg-muted/30 p-4 rounded-lg mt-2">
                    <p className="text-heading whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <a href={`mailto:${selectedContact.email}?subject=Re: ${getSubjectDisplayName(selectedContact.subject)}`}>
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a message to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
