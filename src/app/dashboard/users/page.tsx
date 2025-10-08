'use client';

import { useState, useEffect } from 'react';
import { UserPlus, MoreVertical, Edit, Trash2, Mail, User as UserIcon, CheckCircle, X } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Interface for user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Available user roles
const userRoles = [
  { value: 'Admin', label: 'Admin', description: 'Full access to all features and settings' },
  { value: 'Content Manager', label: 'Content Manager', description: 'Manage and publish all content' },
  { value: 'Editor', label: 'Editor', description: 'Edit content but cannot publish' },
  { value: 'Contributor', label: 'Contributor', description: 'Create content only' },
  { value: 'Viewer', label: 'Viewer', description: 'View-only access to dashboard' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Load users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  // Invite form state
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Contributor',
    message: '',
  });
  
  // Filtered users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle menu toggle
  const toggleMenu = (userId: string) => {
    setShowMenu(showMenu === userId ? null : userId);
  };
  
  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowMenu(null);
  };
  
  // Handle edit user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setShowMenu(null);
  };
  
  // Handle invite form changes
  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInviteForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle invite submission
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: inviteForm.email.split('@')[0], // Temporary name from email
      email: inviteForm.email,
      role: inviteForm.role,
      avatar: `https://ui-avatars.com/api/?name=${inviteForm.email.split('@')[0]}&background=6b46c1&color=fff`,
      status: 'pending',
      lastActive: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setUsers([...users, newUser]);
    setInviteForm({ email: '', role: 'Contributor', message: '' });
    setShowInviteModal(false);
  };
  
  // Format date to readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Get the appropriate badge color for role
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-500/10 text-red-500';
      case 'Content Manager':
        return 'bg-blue-500/10 text-blue-500';
      case 'Editor':
        return 'bg-green-500/10 text-green-500';
      case 'Contributor':
        return 'bg-amber-500/10 text-amber-500';
      case 'Viewer':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Users & Permissions</h1>
          <p className="text-foreground/70 mt-1">Manage team members and their access levels</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowInviteModal(true)}
        >
          <UserPlus size={16} />
          Invite User
        </Button>
      </div>
      
      {/* Search & Filter */}
      <Card className="p-4">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 pl-10 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
        </div>
      </Card>
      
      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/5">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-9 w-9 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-foreground/60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1.5 text-sm ${
                      user.status === 'active' ? 'text-green-500' : 'text-amber-500'
                    }`}>
                      {user.status === 'active' ? (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 bg-green-500`}></span>
                          </span>
                          Active
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 bg-amber-500`}></span>
                          </span>
                          Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/70">
                    {formatDate(user.lastActive || null)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="relative inline-block">
                      <button 
                        className="p-2 hover:bg-muted rounded-full"
                        onClick={() => toggleMenu(user.id)}
                        aria-label="User actions menu"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      
                      {showMenu === user.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-card shadow-lg rounded-md border border-border py-1 z-10">
                          <button 
                            className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit User
                          </button>
                          {user.status === 'pending' && (
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted text-blue-500"
                              onClick={() => alert(`Resend invitation to ${user.email}`)}
                            >
                              <Mail className="h-4 w-4" />
                              Resend Invite
                            </button>
                          )}
                          <button 
                            className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-muted text-red-500"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Role Descriptions */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRoles.map((role) => (
            <div key={role.value} className="p-4 border border-border rounded-lg">
              <div className={`text-sm font-medium ${getRoleBadgeColor(role.value)}`}>
                {role.label}
              </div>
              <p className="text-sm text-foreground/70 mt-1">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Invite New User</h2>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-full hover:bg-muted"
                aria-label="Close invite modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={handleInviteChange}
                  className="w-full px-4 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="colleague@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="role">
                  User Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={inviteForm.role}
                  onChange={handleInviteChange}
                  className="w-full px-4 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {userRoles.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={inviteForm.message}
                  onChange={handleInviteChange}
                  className="w-full px-4 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Add a personal note to your invitation..."
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-full hover:bg-muted"
                aria-label="Close edit user modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedUser.avatar} 
                alt={selectedUser.name} 
                className="h-12 w-12 rounded-full"
              />
              <div>
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-sm text-foreground/60">{selectedUser.email}</div>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="edit-role">
                  User Role
                </label>
                <select
                  id="edit-role"
                  name="role"
                  defaultValue={selectedUser.role}
                  className="w-full px-4 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {userRoles.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center pt-2">
                <input
                  id="active-status"
                  name="status"
                  type="checkbox"
                  defaultChecked={selectedUser.status === 'active'}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="active-status" className="ml-2 block text-sm">
                  Active account
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    // Simulate update
                    alert(`Updated ${selectedUser.name}'s account`);
                    setShowEditModal(false);
                  }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
