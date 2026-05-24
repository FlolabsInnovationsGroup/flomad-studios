import { Suspense } from 'react';
import { Upload, Headphones, Folder } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';

import Loading from '@/components/ui/Loading';

export const metadata = {
  title: "New Podcast Episode | Dashboard | FloStudios.ai",
  description: "Create and upload a new podcast episode to your FloStudios.ai dashboard.",
};

export default function NewPodcastEpisodePage() {
  return (
    <main className="min-h-screen">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Create New Podcast Episode</h1>
            <p className="text-xl text-gray-300">
              Upload and publish a new episode to your podcast series.
            </p>
          </div>

          <Suspense fallback={<Loading />}>
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Upload Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Audio Upload */}
                <GlassCard className="p-6" variant="primary" blur="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-sky-500/20 rounded-lg">
                      <Headphones className="w-6 h-6 text-sky-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Audio File</h2>
                  </div>

                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-sky-400/50 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Audio File</h3>
                    <p className="text-gray-300 mb-4">
                      Drag and drop your audio file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.aac"
                      className="hidden"
                      id="audio-upload"
                    />
                    <label htmlFor="audio-upload">
                      <GlassButton variant="secondary" size="sm" className="cursor-pointer">
                        Choose Audio File
                      </GlassButton>
                    </label>
                    <p className="text-sm text-gray-400 mt-3">
                      Supported formats: MP3, WAV, M4A, AAC (Max 500MB)
                    </p>
                  </div>
                </GlassCard>

                {/* Episode Details */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <h2 className="text-2xl font-bold text-white mb-6">Episode Details</h2>
                  
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="episode-title" className="block text-sm font-medium text-white mb-2">
                        Episode Title *
                      </label>
                      <input
                        type="text"
                        id="episode-title"
                        name="title"
                        required
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="Enter episode title"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="episode-number" className="block text-sm font-medium text-white mb-2">
                          Episode Number
                        </label>
                        <input
                          type="number"
                          id="episode-number"
                          name="episodeNumber"
                          min="1"
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                          placeholder="e.g., 42"
                        />
                      </div>
                      <div>
                        <label htmlFor="season" className="block text-sm font-medium text-white mb-2">
                          Season
                        </label>
                        <input
                          type="number"
                          id="season"
                          name="season"
                          min="1"
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                          placeholder="e.g., 2"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                        Episode Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all resize-none"
                        placeholder="Describe what this episode is about..."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-white mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          id="duration"
                          name="duration"
                          min="1"
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                          placeholder="e.g., 45"
                        />
                      </div>
                      <div>
                        <label htmlFor="release-date" className="block text-sm font-medium text-white mb-2">
                          Release Date
                        </label>
                        <input
                          type="datetime-local"
                          id="release-date"
                          name="releaseDate"
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-white mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="technology, design, creativity (comma-separated)"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="explicit"
                          className="w-4 h-4 text-sky-400 bg-black/30 border-white/20 rounded focus:ring-sky-400 focus:ring-2"
                        />
                        <span className="text-white">Explicit Content</span>
                      </label>
                    </div>
                  </form>
                </GlassCard>

                {/* Thumbnail Upload */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Folder className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Episode Thumbnail</h2>
                  </div>

                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-emerald-400/50 transition-colors">
                    <div className="w-20 h-20 bg-black/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Thumbnail</h3>
                    <p className="text-gray-300 mb-4">
                      Add a custom thumbnail for your episode
                    </p>
                    <input
                      type="file"
                      accept="image/*,.jpg,.jpeg,.png,.webp"
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label htmlFor="thumbnail-upload">
                      <GlassButton variant="ghost" size="sm" className="cursor-pointer border-emerald-400/30 hover:border-emerald-400/60">
                        Choose Image
                      </GlassButton>
                    </label>
                    <p className="text-sm text-gray-400 mt-3">
                      Recommended: 1400x1400px, JPG or PNG (Max 10MB)
                    </p>
                  </div>
                </GlassCard>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <GlassButton variant="primary" size="lg" glow className="flex-1">
                    <Upload className="w-5 h-5 mr-2" />
                    Publish Episode
                  </GlassButton>
                  <GlassButton variant="ghost" size="lg" className="border-amber-400/30 hover:border-amber-400/60">
                    Save as Draft
                  </GlassButton>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Upload Progress */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Upload Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Audio File</span>
                        <span className="text-sky-400">0%</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2">
                        <div className="bg-sky-400 h-2 rounded-full w-0 transition-all duration-300"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Thumbnail</span>
                        <span className="text-emerald-400">0%</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2">
                        <div className="bg-emerald-400 h-2 rounded-full w-0 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Publishing Options */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Publishing Options</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          defaultChecked
                          className="w-4 h-4 text-sky-400 bg-black/30 border-white/20 focus:ring-sky-400 focus:ring-2"
                        />
                        <span className="text-white">Public</span>
                      </label>
                      <p className="text-sm text-gray-400 ml-6">
                        Visible to everyone
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="unlisted"
                          className="w-4 h-4 text-sky-400 bg-black/30 border-white/20 focus:ring-sky-400 focus:ring-2"
                        />
                        <span className="text-white">Unlisted</span>
                      </label>
                      <p className="text-sm text-gray-400 ml-6">
                        Only accessible via direct link
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          className="w-4 h-4 text-sky-400 bg-black/30 border-white/20 focus:ring-sky-400 focus:ring-2"
                        />
                        <span className="text-white">Private</span>
                      </label>
                      <p className="text-sm text-gray-400 ml-6">
                        Only visible to you
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Quick Stats */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Your Podcast Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Episodes</span>
                      <span className="text-white font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Listens</span>
                      <span className="text-white font-semibold">12.5K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Subscribers</span>
                      <span className="text-white font-semibold">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">This Month</span>
                      <span className="text-emerald-400 font-semibold">+156</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Help & Tips */}
                <GlassCard className="p-6" variant="secondary" blur="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Tips for Great Episodes</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-300">Use descriptive titles that capture attention</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-300">Include relevant tags for discoverability</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-300">Write engaging descriptions with key points</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-300">High-quality audio improves listener retention</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
