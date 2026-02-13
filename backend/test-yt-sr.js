const YouTube = require('youtube-sr').default;

async function testPlaylist() {
  try {
    const playlistId = 'PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL'; // CodeWithHarry Web Dev
    console.log('Testing playlist extraction for:', playlistId);
    
    // youtube-sr takes URL or ID
    const playlist = await YouTube.getPlaylist(`https://www.youtube.com/playlist?list=${playlistId}`, { limit: 10 });
    
    console.log('Success! Found:', playlist.videos.length, 'items');
    console.log('Title:', playlist.title);
    console.log('First item:', playlist.videos[0].title);
  } catch (error) {
    console.error('Error extracting playlist:', error.message);
  }
}

testPlaylist();