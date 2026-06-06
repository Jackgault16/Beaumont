const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const target = path.join(root, 'instagram-feed.json');
const token = process.env.INSTAGRAM_ACCESS_TOKEN;

function writeFeed(posts = []) {
  fs.writeFileSync(target, `${JSON.stringify({ updated_at: new Date().toISOString(), posts }, null, 2)}\n`);
}

async function main() {
  if (!token) {
    console.log('INSTAGRAM_ACCESS_TOKEN not set; keeping existing instagram-feed.json.');
    return;
  }

  const endpoint = new URL('https://graph.instagram.com/me/media');
  endpoint.searchParams.set('fields', 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp');
  endpoint.searchParams.set('limit', '6');
  endpoint.searchParams.set('access_token', token);

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Instagram feed fetch failed: ${response.status} ${await response.text()}`);

  const data = await response.json();
  const posts = (data.data || []).slice(0, 6).map((post) => ({
    id: post.id,
    permalink: post.permalink,
    image_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
    caption: post.caption || '',
    timestamp: post.timestamp || '',
    media_type: post.media_type || '',
  })).filter((post) => post.permalink && post.image_url);

  writeFeed(posts);
  console.log(`Generated Instagram feed with ${posts.length} posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
