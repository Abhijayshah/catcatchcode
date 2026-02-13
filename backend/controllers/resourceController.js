const asyncHandler = require('express-async-handler');
const Resource = require('../models/Resource');
const yts = require('yt-search');

// @desc    Extract YouTube info (Playlist items or Video description)
// @route   POST /api/resources/extract
// @access  Private
const extractInfo = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400);
    throw new Error('Please provide a URL');
  }

  try {
    let result = {
      type: 'unknown',
      data: []
    };

    if (url.includes('list=')) {
      // Handle Playlist
      const listId = url.split('list=')[1]?.split('&')[0];
      if (listId) {
        const playlist = await yts({ listId });
        result.type = 'playlist';
        result.title = playlist.title;
        // yt-search returns 'videos' array
        result.data = playlist.videos.map((item, index) => ({
          label: item.title,
          time: index,
          timeStr: `#${index + 1}`
        }));
      }
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Handle Single Video
      let videoId = '';
      if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }

      if (videoId) {
        const video = await yts({ videoId });
        result.type = 'video';
        result.title = video.title;
        result.description = video.description;
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Extraction Error:', error.message);
    res.status(400);
    throw new Error('Failed to extract info: ' + error.message);
  }
});

// @desc    Get user resources
// @route   GET /api/resources
// @access  Private
const getResources = asyncHandler(async (req, req_res) => {
  const resources = await Resource.find({ user: req.user._id }).sort({ createdAt: -1 });
  req_res.json(resources);
});

// @desc    Add new resource
// @route   POST /api/resources
// @access  Private
const addResource = asyncHandler(async (req, res) => {
  const { title, url, section, provider, timestamps } = req.body;

  if (!title || !url) {
    res.status(400);
    throw new Error('Please provide title and URL');
  }

  const resource = await Resource.create({
    user: req.user._id,
    title,
    url,
    section: section || 'Notes',
    provider: provider || 'other',
    timestamps: timestamps || [],
  });

  res.status(201).json(resource);
});

// @desc    Update resource progress
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error('Resource not found');
  }

  // Check user
  if (resource.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedResource = await Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedResource);
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error('Resource not found');
  }

  // Check user
  if (resource.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await resource.deleteOne();

  res.json({ id: req.params.id });
});

module.exports = {
  getResources,
  addResource,
  updateResource,
  deleteResource,
  extractInfo,
};
