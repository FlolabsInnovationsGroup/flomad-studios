'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Music, Upload, X, AlertCircle, Loader2, ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

// Available podcast categories
const categories = [
  'Business',
  'Technology',
  'Design',
  'Marketing',
  'Education',
  'Entertainment',
  'Other'
];

export default function PodcastUploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Handle audio file selection
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file is audio
      if (!file.type.startsWith('audio/')) {
        setError('Please select a valid audio file');
        return;
      }
      setAudioFile(file);
      setAudioFileName(file.name);
      setError(null);
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file for the thumbnail');
        return;
      }
      setThumbnailFile(file);
      setError(null);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear thumbnail
  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  // Clear audio file
  const clearAudioFile = () => {
    setAudioFile(null);
    setAudioFileName('');
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Please enter a podcast title');
      return;
    }
    
    if (!audioFile) {
      setError('Please upload an audio file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // First, upload the files to get their URLs
      let audioUrl = '';
      let thumbnailUrl = '';
      
      // Upload audio file with progress tracking
      const audioFormData = new FormData();
      audioFormData.append('file', audioFile);
      audioFormData.append('fileType', 'audio');
      
      const audioUploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: audioFormData,
      });
      
      if (!audioUploadResponse.ok) {
        throw new Error('Failed to upload audio file');
      }
      
      const audioData = await audioUploadResponse.json();
      audioUrl = audioData.url;
      setUploadProgress(50); // Set to 50% after audio upload
      
      // Upload thumbnail if available
      if (thumbnailFile) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnailFile);
        thumbnailFormData.append('fileType', 'image');
        
        const thumbnailUploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: thumbnailFormData,
        });
        
        if (!thumbnailUploadResponse.ok) {
          throw new Error('Failed to upload thumbnail');
        }
        
        const thumbnailData = await thumbnailUploadResponse.json();
        thumbnailUrl = thumbnailData.url;
      }
      
      setUploadProgress(75); // Set to 75% after all uploads
      
      // Create podcast record
      const podcastData = {
        title,
        description: description.trim() || undefined,
        src: audioUrl,
        poster: thumbnailUrl || undefined,
        category: category || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published: false, // Default to draft
      };
      
      const createResponse = await fetch('/api/podcasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(podcastData),
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to create podcast');
      }
      
      setUploadProgress(100);
      
      // Redirect to podcasts page
      router.push('/dashboard/podcasts');
    } catch (err) {
      console.error('Error uploading podcast:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload podcast');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          asChild
          className="rounded-full h-9 w-9 p-0"
        >
          <Link href="/dashboard/podcasts">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Upload Podcast</h1>
      </div>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              Podcast Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter podcast title"
              required
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
              placeholder="Enter podcast description"
            />
          </div>
          
          {/* Audio Upload */}
          <div className="space-y-2">
            <label className="block font-medium">
              Audio File <span className="text-red-500">*</span>
            </label>
            <div className="border border-dashed border-border rounded-md p-4">
              {!audioFileName ? (
                <div className="text-center py-8">
                  <Music className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
                  <p className="text-foreground/70 mb-4">
                    Drag and drop your audio file here or click to browse
                  </p>
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    id="audio-upload"
                  />
                  <Button 
                    type="button"
                    onClick={() => audioInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Select Audio File
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <Music className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-md" />
                    <div>
                      <p className="font-medium">{audioFileName}</p>
                      <p className="text-sm text-foreground/70">
                        {audioFile ? `${(audioFile.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAudioFile}
                    className="rounded-full h-9 w-9 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block font-medium">
              Thumbnail Image
            </label>
            <div className="border border-dashed border-border rounded-md p-4">
              {!thumbnailPreview ? (
                <div className="text-center py-8">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-md bg-foreground/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-foreground/30" />
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Upload a thumbnail image for your podcast
                  </p>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <Button 
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Select Image
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailPreview})` }} />
                    <div>
                      <p className="font-medium">{thumbnailFile?.name}</p>
                      <p className="text-sm text-foreground/70">
                        {thumbnailFile ? `${(thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearThumbnail}
                    className="rounded-full h-9 w-9 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="block font-medium">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-sm text-foreground/70">
              Separate tags with commas (e.g. design, marketing, tutorial)
            </p>
          </div>
          
          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-in-out" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/podcasts')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !title || !audioFile}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Podcast'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 
