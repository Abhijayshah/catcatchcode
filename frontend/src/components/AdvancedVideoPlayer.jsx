import React, { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const AdvancedVideoPlayer = ({ url, initialTime = 0, onProgress, onReady }) => {
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState('');
  const [listId, setListId] = useState('');

  useEffect(() => {
    let vId = '';
    let lId = '';

    if (url.includes('list=')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      lId = urlParams.get('list');
    }

    if (url.includes('youtube.com/watch?v=')) {
      vId = url.split('v=')[1];
      const ampersandPosition = vId.indexOf('&');
      if (ampersandPosition !== -1) {
        vId = vId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      vId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/embed/')) {
      const parts = url.split('/');
      vId = parts[parts.length - 1].split('?')[0];
    }

    setVideoId(vId);
    setListId(lId);
  }, [url]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      list: listId || undefined,
      listType: listId ? 'playlist' : undefined,
      start: Math.floor(initialTime),
    },
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (onReady) onReady(event.target);
    
    // Resume from last position if it's a single video (playlists handle their own state mostly)
    if (!listId && initialTime > 0) {
      event.target.seekTo(initialTime);
    }
  };

  const handleStateChange = (event) => {
    // 1 = Playing, 2 = Paused, 0 = Ended
    if (event.data === 1) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  const timerRef = useRef(null);

  const startTracking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0 && onProgress) {
          onProgress(currentTime, duration);
        }
      }
    }, 5000); // Update every 5 seconds
  };

  const stopTracking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => stopTracking();
  }, []);

  if (!videoId && !listId) {
    return <div className="text-white text-center p-10">Invalid Video URL</div>;
  }

  return (
    <div className="relative w-full h-full">
      <YouTube
        key={listId || videoId} // Force re-render when video/playlist changes
        videoId={!listId ? videoId : undefined}
        opts={opts}
        onReady={handleReady}
        onStateChange={handleStateChange}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default AdvancedVideoPlayer;
