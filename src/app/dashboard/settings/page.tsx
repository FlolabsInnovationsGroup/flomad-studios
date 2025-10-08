'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, Bell, Lock, Save, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Profile data from session/API
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    website: '',
    twitter: '',
    location: ''
  });
  
  // User preferences
  const [notificationSettings, setNotificationSettings] = useState({
    emailDigest: true,
    contentComments: true,
    mentionNotifications: true,
    contentPublished: true,
    teamUpdates: false,
    marketingEmails: false
  });
  
  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    compactMode: false,
    animationsEnabled: true
  });

  // Load user data from session
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || '',
        email: session.user.email || '',
        role: (session.user as { role?: string }).role || 'User',
        bio: '',
        website: '',
        twitter: '',
        location: ''
      });
      setLoading(false);
    }
  }, [session]);
  
  // Update profile data
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  // Toggle notification settings
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Update appearance settings
  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  // Save settings
  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaving(false);
  };
  
  // Tab content mapping
  const tabContent = {
    profile: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Profile Information</h2>
        <p className="text-foreground/70">Manage your personal information and public profile.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={profileData.role}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={profileData.location}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={profileData.bio}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="website">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={profileData.website}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="twitter">
              Twitter
            </label>
            <input
              id="twitter"
              name="twitter"
              type="text"
              value={profileData.twitter}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>
    ),
    
    notifications: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Notification Preferences</h2>
        <p className="text-foreground/70">Control how and when you receive notifications.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="email-digest-label">Email Digest</h3>
              <p className="text-sm text-foreground/60">Receive a weekly summary of your content performance</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.emailDigest}
                  onChange={() => toggleNotification('emailDigest')}
                  aria-labelledby="email-digest-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="content-comments-label">Content Comments</h3>
              <p className="text-sm text-foreground/60">Get notified when someone comments on your content</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.contentComments}
                  onChange={() => toggleNotification('contentComments')}
                  aria-labelledby="content-comments-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="mentions-label">Mentions</h3>
              <p className="text-sm text-foreground/60">Get notified when you are mentioned in comments</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.mentionNotifications}
                  onChange={() => toggleNotification('mentionNotifications')}
                  aria-labelledby="mentions-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="content-published-label">Content Published</h3>
              <p className="text-sm text-foreground/60">Get notified when your scheduled content is published</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.contentPublished}
                  onChange={() => toggleNotification('contentPublished')}
                  aria-labelledby="content-published-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="team-updates-label">Team Updates</h3>
              <p className="text-sm text-foreground/60">Get notified about team member activities</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.teamUpdates}
                  onChange={() => toggleNotification('teamUpdates')}
                  aria-labelledby="team-updates-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-muted/5 rounded-lg">
            <div>
              <h3 className="font-medium" id="marketing-emails-label">Marketing Emails</h3>
              <p className="text-sm text-foreground/60">Receive marketing emails about new features and offers</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificationSettings.marketingEmails}
                  onChange={() => toggleNotification('marketingEmails')}
                  aria-labelledby="marketing-emails-label"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    ),
    
    account: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Account Settings</h2>
        <p className="text-foreground/70">Manage your account preferences and security.</p>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Appearance</h3>
            
            <div>
              <label className="block text-sm mb-1" htmlFor="theme">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={appearanceSettings.theme}
                onChange={handleAppearanceChange}
                className="w-full max-w-xs px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="system">System Preference</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="compactMode"
                name="compactMode"
                type="checkbox"
                checked={appearanceSettings.compactMode}
                onChange={handleAppearanceChange}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="compactMode" className="ml-2 block text-sm">
                Compact Mode
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="animationsEnabled"
                name="animationsEnabled"
                type="checkbox"
                checked={appearanceSettings.animationsEnabled}
                onChange={handleAppearanceChange}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="animationsEnabled" className="ml-2 block text-sm">
                Enable Animations
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium mb-4">Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="w-full max-w-md px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="w-full max-w-md px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full max-w-md px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
              
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium mb-4 text-red-500">Danger Zone</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-950/20 dark:border-red-800/30">
                <h4 className="font-medium text-red-700 dark:text-red-400">Delete Account</h4>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-950/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-foreground/70 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 p-4">
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'profile' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted/50 text-foreground/80'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'notifications' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted/50 text-foreground/80'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'account' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted/50 text-foreground/80'
              }`}
              onClick={() => setActiveTab('account')}
            >
              <Lock className="h-4 w-4" />
              Account
            </button>
          </nav>
        </Card>
        
        <Card className="md:col-span-3 p-6">
          {tabContent[activeTab as keyof typeof tabContent]}
          
          <div className="mt-6 pt-6 border-t border-border flex justify-end">
            <Button 
              className="flex items-center gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="animate-spin">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 
