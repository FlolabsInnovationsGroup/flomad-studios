'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Upload, X, Image, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface VideoData {
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

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [posterSrc, setPosterSrc] = useState('');
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  const [updating, setUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Categories for videos
  const categories = [
    'Tutorial', 
    'Case Study', 
    'Behind The Scenes', 
    'Interview', 
    'Product Demo', 
    'Event'
  ];
  
  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/videos/${videoId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        
        const video: VideoData = await response.json();
        
        // Set form data
        setTitle(video.title);
        setDescription(video.description || '');
        setCategory(video.category || '');
        setTags(video.tags.join(', '));
        setIsPublished(video.published);
        setVideoSrc(video.src);
        setPosterSrc(video.poster || '');
        
        // Set preview sources
        setVideoPreview(video.src);
        if (video.poster) {
          setThumbnailPreview(video.poster);
        }
        
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [videoId]);
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video file size should be less than 100MB');
      return;
    }
    
    // Check file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid video format. Supported formats: MP4, WebM, MOV');
      return;
    }
    
    setVideoFile(file);
    setError(null);
    
    // Create preview URL
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Thumbnail size should be less than 5MB');
      return;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid image format. Supported formats: JPG, PNG, WebP');
      return;
    }
    
    setThumbnailFile(file);
    setError(null);
    
    // Create preview URL
    const imageURL = URL.createObjectURL(file);
    setThumbnailPreview(imageURL);
  };
  
  const removeVideo = () => {
    setVideoFile(null);
    // Restore original video preview if available
    setVideoPreview(videoSrc || null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };
  
  const removeThumbnail = () => {
    setThumbnailFile(null);
    // Restore original thumbnail preview if available
    setThumbnailPreview(posterSrc || null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      setError('Please enter a title');
      return;
    }
    
    try {
      setUpdating(true);
      setError(null);
      
      let updatedVideoUrl = videoSrc;
      let updatedThumbnailUrl = posterSrc;
      
      // Upload new video if selected
      if (videoFile) {
        setUploadProgress(10);
        const videoFormData = new FormData();
        videoFormData.append('file', videoFile);
        videoFormData.append('fileType', 'video');
        
        const videoUploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: videoFormData,
        });
        
        if (!videoUploadRes.ok) {
          throw new Error('Failed to upload video');
        }
        
        const videoData = await videoUploadRes.json();
        updatedVideoUrl = videoData.url;
        setUploadProgress(50);
      }
      
      // Upload new thumbnail if selected
      if (thumbnailFile) {
        setUploadProgress(60);
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnailFile);
        thumbnailFormData.append('fileType', 'image');
        
        const thumbnailUploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: thumbnailFormData,
        });
        
        if (!thumbnailUploadRes.ok) {
          throw new Error('Failed to upload thumbnail');
        }
        
        const thumbnailData = await thumbnailUploadRes.json();
        updatedThumbnailUrl = thumbnailData.url;
        setUploadProgress(80);
      }
      
      // Update video in database
      const videoMetadata = {
        title,
        description,
        src: updatedVideoUrl,
        poster: updatedThumbnailUrl || undefined,
        category: category || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published: isPublished,
      };
      
      const updateRes = await fetch(`/api/videos/${videoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoMetadata),
      });
      
      if (!updateRes.ok) {
        throw new Error('Failed to update video');
      }
      
      setUploadProgress(100);
      setSuccess(true);
      
      // Redirect after 1 second
      setTimeout(() => {
        router.push('/dashboard/videos');
      }, 1000);
      
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary mb-4" />
          <p className="text-lg">Loading video data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Video</h1>
        <p className="text-foreground/70 mt-1">Update video details and media</p>
      </div>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/10 text-green-500 p-4 rounded-md flex items-start gap-3">
          <CheckCircle className="w-5 h-5 mt-0.5" />
          <p>Video updated successfully! Redirecting to videos list...</p>
        </div>
      )}
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Preview/Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Video File</h2>
            <div className="relative bg-card border border-border rounded-lg overflow-hidden">
              <video 
                src={videoPreview || undefined} 
                className="w-full h-64 object-contain"
                controls
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Replace Video
                </Button>
                {videoFile && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-black/50 hover:bg-red-500/70 text-white"
                    onClick={removeVideo}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
            <input 
              type="file" 
              ref={videoInputRef}
              className="hidden"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoChange}
              aria-label="Upload video file"
            />
          </div>
          
          {/* Thumbnail Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Thumbnail Image</h2>
            {!thumbnailPreview ? (
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/30 transition"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Click to upload thumbnail</p>
                <p className="text-foreground/60 text-sm mb-4">JPG, PNG or WebP (max. 5MB)</p>
                <Button type="button" variant="outline" className="mx-auto">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
                <input 
                  type="file" 
                  ref={thumbnailInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleThumbnailChange}
                  aria-label="Upload thumbnail image"
                />
              </div>
            ) : (
              <div className="relative bg-card border border-border rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={thumbnailPreview} 
                  alt="Video thumbnail preview"
                  className="w-full h-48 object-contain"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Replace Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-black/50 hover:bg-red-500/70 text-white"
                    onClick={removeThumbnail}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Video Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Video Details</h2>
            
            <div className="grid gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded-md border border-border bg-card p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full rounded-md border border-border bg-card p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter video description"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded-md border border-border bg-card p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  className="w-full rounded-md border border-border bg-card p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                <p className="text-xs text-foreground/60 mt-1">
                  Separate tags with commas (e.g. design, tutorial, branding)
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  id="published"
                  type="checkbox"
                  className="rounded border-border focus:ring-primary"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <label htmlFor="published" className="ml-2 text-sm font-medium">
                  Published
                </label>
              </div>
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 md:flex-none md:min-w-32"
              disabled={updating}
            >
              {updating ? `Updating (${uploadProgress}%)` : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 md:flex-none md:min-w-32"
              onClick={() => router.push('/dashboard/videos')}
              disabled={updating}
            >
              Cancel
            </Button>
          </div>
          
          {/* Progress Bar */}
          {updating && (
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div 
                className={`bg-primary h-2 rounded-full transition-all duration-300`}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
} 