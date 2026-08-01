const query = process.argv.slice(2).join(' ') || 'servidor rust';
const url = new URL('https://comrades-of-war.com/agent/v1/search');
url.searchParams.set('q', query);
url.searchParams.set('limit', '5');

const response = await fetch(url, {
  headers: { 'user-agent': 'ComradesOfWar-Agent-Example/1.0' },
});
if (!response.ok) throw new Error(`Search failed with HTTP ${response.status}`);

console.log(JSON.stringify(await response.json(), null, 2));
