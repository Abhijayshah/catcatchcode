import { useState } from 'react';
import { Plus, Link as LinkIcon, X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddResourceForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    section: 'Notes',
    provider: 'other',
    timestamps: []
  });

  const [bulkInput, setBulkInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const isPlaylist = (url) => url.includes('list=');

  const detectProvider = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('drive.google.com')) return 'drive';
    if (url.includes('dropbox.com')) return 'dropbox';
    if (url.includes('notion.so')) return 'notion';
    if (url.includes('github.com')) return 'github';
    if (url.endsWith('.pdf')) return 'pdf';
    return 'other';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'url') {
      const provider = detectProvider(value);
      setFormData(prev => ({ ...prev, [name]: value, provider }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const timeToSeconds = (timeStr) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  const handleAddTimestamp = () => {
    if (timestampInput.label && timestampInput.time) {
      const seconds = timeToSeconds(timestampInput.time);
      if (seconds > 0) {
        setFormData(prev => ({
          ...prev,
          timestamps: [...prev.timestamps, { label: timestampInput.label, time: seconds, timeStr: timestampInput.time }]
        }));
        setTimestampInput({ label: '', time: '' });
      } else {
        toast.error('Invalid time format. Use MM:SS or HH:MM:SS');
      }
    }
  };

  const handleAutoExtract = async () => {
    if (!formData.url) {
      toast.error('Please enter a URL first');
      return;
    }

    setIsExtracting(true);
    try {
      const { data } = await api.post('/resources/extract', { url: formData.url });
      
      if (data.type === 'playlist') {
        if (data.data && data.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            title: prev.title || data.title, // Auto-fill title if empty
            timestamps: data.data
          }));
          toast.success(`Found ${data.data.length} videos in playlist!`);
        }
      } else if (data.type === 'video') {
        setFormData(prev => ({
          ...prev,
          title: prev.title || data.title
        }));
        
        if (data.description) {
          // If description exists, try to parse timestamps from it
          setBulkInput(data.description);
          toast.success('Description fetched! Click "Extract Timestamps" to parse.');
          setShowBulkInput(true);
        } else {
          toast.success('Video details fetched!');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to extract info');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleBulkParse = () => {
    if (!bulkInput.trim()) return;

    const lines = bulkInput.split('\n');
    const newTimestamps = [];
    const isPlaylistUrl = isPlaylist(formData.url);

    lines.forEach((line, index) => {
      if (!line.trim()) return;
      
      if (isPlaylistUrl) {
        // For playlists, just take the whole line as the label (remove leading numbers/bullets if any)
        // Match "1. Title" or "- Title" or just "Title"
        const match = line.match(/^(?:\d+[\.)]\s*|[-–—]\s*)?(.+)$/);
        if (match) {
          const label = match[1].trim();
          if (label) {
            newTimestamps.push({
              label,
              time: index, // Use time field to store the playlist index (0-based)
              timeStr: `#${index + 1}`
            });
          }
        }
      } else {
        // Existing timestamp logic for single videos
        // Regex explanation:
        // (?:[^\w\s]*\s*)? -> Optional non-word characters (emojis, bullets) and spaces at start
        // \(? -> Optional opening parenthesis
        // (\d{1,2}:\d{2}(?::\d{2})?) -> Capture Group 1: Time (M:SS, MM:SS, H:MM:SS)
        // \)? -> Optional closing parenthesis
        // \s*(?:[-–—]\s*)? -> Optional separator (space, dash)
        // (.+) -> Capture Group 2: Label (rest of string)
        const match = line.match(/(?:[^\w\s]*\s*)?\(?(\d{1,2}:\d{2}(?::\d{2})?)\)?\s*(?:[-–—]\s*)?(.+)/);
        
        if (match) {
          const timeStr = match[1];
          const label = match[2].trim();
          const seconds = timeToSeconds(timeStr);
          
          if (seconds >= 0 && label) {
            newTimestamps.push({
              label,
              time: seconds,
              timeStr
            });
          }
        }
      }
    });

    if (newTimestamps.length > 0) {
      // Replace existing timestamps with new parsed ones
      setFormData(prev => ({
        ...prev,
        timestamps: newTimestamps
      }));
      setBulkInput(''); 
      toast.success(`Extracted ${newTimestamps.length} ${isPlaylistUrl ? 'playlist items' : 'timestamps'}!`);
    } else {
      toast.error(isPlaylistUrl ? 'No valid titles found.' : 'No valid timestamps found. Try format: 0:00 Label');
    }
  };

  const removeTimestamp = (index) => {
    setFormData(prev => ({
      ...prev,
      timestamps: prev.timestamps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/resources', formData);
      onAdd(data);
      toast.success('Resource added successfully');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add resource');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Add New Resource</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="e.g., React Hooks Guide"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Link</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              name="url"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="https://..."
              value={formData.url}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="Home">Home</option>
              <option value="Video">Video</option>
              <option value="AI">AI</option>
              <option value="Handwritten">Handwritten</option>
              <option value="Notes">Notes</option>
              <option value="Lab">Lab</option>
              <option value="Papers">Papers</option>
              <option value="Portfolio">Portfolio</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              value={formData.provider}
              readOnly
            />
          </div>
        </div>
        
        {/* Auto-Extract Button */}
        {(formData.provider === 'youtube') && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAutoExtract}
              disabled={isExtracting}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              {isExtracting ? (
                <>Loading...</>
              ) : (
                <>Auto-Fetch Details from YouTube</>
              )}
            </button>
          </div>
        )}

        {formData.provider === 'youtube' && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPlaylist(formData.url) ? 'Paste Playlist Videos' : 'Paste Course Content (Timestamps)'}
              <span className="block text-xs text-gray-500 font-normal mt-1">
                {isPlaylist(formData.url) 
                  ? 'Copy and paste the list of video titles in order.' 
                  : 'Copy and paste the full list from YouTube description.'}
              </span>
            </label>

            <div className="mb-3">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono h-32 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder={isPlaylist(formData.url) 
                  ? `Example:\n1. Introduction\n2. Next Video Title` 
                  : `Example:\n(0:00) Introduction\n1:18 What is Deep Learning`}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleBulkParse}
                className="w-full py-2 mt-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Extract {isPlaylist(formData.url) ? 'Playlist Items' : 'Timestamps'}
              </button>
            </div>
            
            {formData.timestamps.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
                  <span>Extracted {isPlaylist(formData.url) ? 'Videos' : 'Chapters'} ({formData.timestamps.length})</span>
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, timestamps: [] }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-lg bg-gray-50">
                  {formData.timestamps.map((ts, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 border-b border-gray-100 last:border-0 text-sm hover:bg-gray-100">
                      <span className="line-clamp-1">{ts.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono text-xs">{ts.timeStr}</span>
                        <button
                          type="button"
                          onClick={() => removeTimestamp(idx)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResourceForm;
