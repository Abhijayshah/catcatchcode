const yts = require('yt-search');

async function testPlaylist() {
  try {
    const playlistId = 'PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL'; 
    console.log('Testing playlist extraction for:', playlistId);
    
    const list = await yts({ listId: playlistId });
    
    console.log('Success! Found:', list.videos.length, 'items');
    console.log('Title:', list.title);
    console.log('First item:', list.videos[0].title);
  } catch (error) {
    console.error('Error extracting playlist:', error.message);
  }
}

testPlaylist();