'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, Tag, Clock, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function NewBlogPostPage() {
  const router = useRouter();
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    readTime: '',
    isPublished: false,
  });

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImagePreview(imageUrl);
      
      // Clear error if there was one
      if (errors.coverImage) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.coverImage;
          return newErrors;
        });
      }
    }
  };

  const removeCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Upload cover image to storage/CDN if it exists
      // 2. Create database entry with blog post data
      // 3. Process content (sanitize HTML, optimize images)
      
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ submit: 'Failed to save blog post. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const estimateReadTime = (content: string) => {
    // Average reading speed is ~225 words per minute
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 225);
    
    return `${minutes} min read`;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const readTime = estimateReadTime(newContent);
    
    setFormData(prev => ({ 
      ...prev, 
      content: newContent,
      readTime
    }));
    
    // Clear error if there was one
    if (errors.content) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  const generateExcerpt = (content: string, maxLength = 160) => {
    // Remove HTML tags if any
    const plainText = content.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    // Find the last space before maxLength
    const lastSpace = plainText.substring(0, maxLength).lastIndexOf(' ');
    return plainText.substring(0, lastSpace) + '...';
  };

  const handleBlurContent = () => {
    if (formData.content && !formData.excerpt) {
      const excerpt = generateExcerpt(formData.content);
      setFormData(prev => ({ ...prev, excerpt }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-foreground/70 mt-1">Write and publish a new article</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Post Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.title ? 'border-red-500' : 'border-border'
                } bg-card focus:outline-none focus:ring-2 focus:ring-primary/20`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={15}
                value={formData.content}
                onChange={handleContentChange}
                onBlur={handleBlurContent}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.content ? 'border-red-500' : 'border-border'
                } bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono`}
                placeholder="Write your post content here..."
              />
              {errors.content ? (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              ) : (
                <p className="mt-1 text-xs text-foreground/50 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Estimated read time: {formData.readTime || '0 min read'}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="excerpt">
                Excerpt (Summary)
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Brief summary of your post (generated automatically if left empty)"
              />
              <p className="mt-1 text-xs text-foreground/50">
                This will be displayed on blog listing pages. Max 160 characters recommended.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Post Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.category ? 'border-red-500' : 'border-border'
                    } bg-card focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  >
                    <option value="">Select a category</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Business">Business</option>
                    <option value="Typography">Typography</option>
                    <option value="Animation">Animation</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="tags">
                    Tags
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      id="tags"
                      name="tags"
                      type="text"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  <p className="mt-1 text-xs text-foreground/50">
                    Separate tags with commas (e.g., design, typography)
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              {!coverImageFile ? (
                <>
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/5 h-[200px] flex flex-col items-center justify-center"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    <ImageIcon className="mx-auto h-10 w-10 text-foreground/50 mb-2" />
                    <p className="text-sm font-medium">
                      Upload a cover image
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">
                      16:9 ratio recommended (JPG, PNG)
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={coverImageInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleCoverImageChange}
                    aria-label="Upload cover image file"
                  />
                </>
              ) : (
                <div className="bg-muted/5 rounded-lg p-4 h-[200px] relative">
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full z-10 text-white"
                    aria-label="Remove cover image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {coverImagePreview && (
                    <div className="w-full h-full bg-black rounded-md overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImagePreview}
                        alt="Cover image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm">
                Publish immediately
              </label>
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/blog')}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="relative"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin mr-2">
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
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {errors.submit && (
            <p className="mt-4 text-sm text-red-500">{errors.submit}</p>
          )}
        </Card>
      </form>
    </div>
  );
} 
