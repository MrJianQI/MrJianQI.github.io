'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus, UploadCloud, PenTool, Hash, Calendar, FileText, FileUp, CheckCircle2 } from 'lucide-react';

export function UploadForm() {
  const router = useRouter();

  // Hide the entire form in production environments (like GitHub Pages)
  // because filesystem operations aren't available there.
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  const [summary, setSummary] = useState('');
  
  // Tag states
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags');
        if (res.ok) {
          const tags = await res.json();
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };
    fetchTags();
  }, []);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags([...selectedTags, trimmedTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(tagInput);
    } else if (e.key === ',' || e.key === '，') {
       e.preventDefault();
       handleAddTag(tagInput);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }
    if (!title) {
        setMessage('Please enter a title.');
        return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('publishedAt', publishedAt);
    formData.append('summary', summary);
    formData.append('tags', selectedTags.join(','));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Success feedback
        setMessage(`Post "${title}" created successfully!`);
        
        // Reset form
        setFile(null);
        setTitle('');
        setSummary('');
        setSelectedTags([]);
        setTagInput('');
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
        
        // Collapse form immediately
        setIsExpanded(false);
        
        // Refresh content
        router.refresh();

        // Clear message after delay
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-end gap-4 mb-4 h-10">
        {message && (
            <div className={`text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300 ${message.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {message.includes('successfully') ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {message}
            </div>
        )}
        <button
          onClick={() => {
              setIsExpanded(!isExpanded);
              if(!isExpanded) setMessage(''); // Clear message when opening
          }}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-10 px-6 py-2 gap-2 ${
            isExpanded 
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]'
          }`}
        >
          {isExpanded ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <PenTool className="w-4 h-4" /> Write a Post
            </>
          )}
        </button>
      </div>

      <div 
        className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
            <div className="bg-card text-card-foreground border rounded-xl shadow-lg p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <FileUp className="w-24 h-24" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Create New Post</h2>
                <p className="text-muted-foreground text-sm">Share your thoughts with the world.</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="title" className="text-sm font-medium leading-none flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" /> Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My Awesome Post Title"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium leading-none flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" /> Published Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={publishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="file-upload" className="text-sm font-medium leading-none flex items-center gap-2">
                        <UploadCloud className="w-4 h-4 text-muted-foreground" /> Markdown File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".mdx,.md"
                        onChange={handleFileChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="summary" className="text-sm font-medium leading-none">Summary</label>
                    <textarea
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a brief summary of your post..."
                        rows={3}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                    />
                </div>

                <div className="space-y-3 md:col-span-2">
                    <label htmlFor="tags" className="text-sm font-medium leading-none flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" /> Tags
                    </label>
                    <div className="p-4 rounded-lg border bg-muted/30 space-y-3">
                        <div className="flex flex-wrap gap-2 min-h-[24px]">
                            {selectedTags.length > 0 ? selectedTags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-sm group cursor-default">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                            )) : <span className="text-xs text-muted-foreground italic">No tags selected</span>}
                        </div>
                        <input
                            id="tags"
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Type tag & press Enter..."
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                        {availableTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                            <span className="text-xs text-muted-foreground self-center mr-1">Suggestions:</span>
                            {availableTags.filter(tag => !selectedTags.includes(tag)).slice(0, 10).map(tag => (
                                <button key={tag} type="button" onClick={() => handleAddTag(tag)} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-input bg-background hover:bg-accent transition-all shadow-sm">
                                    <Plus className="w-3 h-3 mr-1" /> {tag}
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
                >
                    {uploading ? 'Uploading...' : <>Create Post <UploadCloud className="w-4 h-4 ml-2" /></>}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
