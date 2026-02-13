const ytpl = require('ytpl');

async function testPlaylist() {
  try {
    const playlistId = 'PLMC9KNkIncKvYIN_BA6kF50Kl8d1a8oIx';
    console.log('Testing playlist extraction for:', playlistId);
    const playlist = await ytpl(playlistId, { limit: 10 });
    console.log('Success! Found:', playlist.items.length, 'items');
    console.log('First item:', playlist.items[0].title);
  } catch (error) {
    console.error('Error extracting playlist:', error.message);
    if (error.statusCode === 410) {
      console.error('YouTube API endpoint might be gone (410 Gone). ytpl might be broken.');
    }
  }
}

testPlaylist();