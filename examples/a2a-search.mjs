const query = process.argv.slice(2).join(' ').trim() || 'servidor rust';
const cardUrl = 'https://comrades-of-war-router.discoglobal.workers.dev/.well-known/agent-card.json';
const cardResponse = await fetch(cardUrl, { headers: { accept: 'application/json' } });
if (!cardResponse.ok) {
  throw new Error(`A2A Agent Card discovery failed with HTTP ${cardResponse.status}`);
}
const card = await cardResponse.json();
const endpoint = card.supportedInterfaces?.[0]?.url || card.url;
if (!endpoint) throw new Error('A2A Agent Card did not advertise an endpoint');

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'a2a-version': '1.0',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: crypto.randomUUID(),
    method: 'SendMessage',
    params: {
      message: {
        messageId: crypto.randomUUID(),
        role: 'ROLE_USER',
        parts: [{ text: query }],
      },
    },
  }),
});

if (!response.ok) {
  throw new Error(`A2A request failed with HTTP ${response.status}: ${await response.text()}`);
}

const payload = await response.json();
if (payload.error) {
  throw new Error(`A2A error ${payload.error.code}: ${payload.error.message}`);
}

const task = payload.result?.task;
if (task?.status?.state !== 'TASK_STATE_COMPLETED') {
  throw new Error(`Unexpected A2A task state: ${task?.status?.state || 'missing'}`);
}

const search = task.artifacts
  ?.flatMap((artifact) => artifact.parts || [])
  .find((part) => part.mediaType === 'application/json' && part.data)
  ?.data;

if (!search || !Array.isArray(search.results)) {
  throw new Error('A2A response did not include structured archive results');
}

console.log(JSON.stringify({
  query: search.query,
  total: search.total,
  returned: search.returned,
  price_per_full_page: search.price_per_full_page,
  results: search.results.map((result) => ({
    title: result.title,
    forum: result.forum,
    published_at: result.published_at,
    excerpt: result.excerpt,
    purchase_url: result.purchase_url,
  })),
}, null, 2));
