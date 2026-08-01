const endpoint = process.env.COW_MCP_URL
  || 'https://comrades-of-war-router.discoglobal.workers.dev/mcp';
const query = process.argv.slice(2).join(' ').trim() || 'servidor rust';

async function rpc(body) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json',
      'mcp-protocol-version': '2025-11-25',
    },
    body: JSON.stringify(body),
  });
  if (body.id === undefined) {
    if (response.status !== 202) throw new Error(`MCP notification failed: HTTP ${response.status}`);
    return null;
  }
  if (!response.ok) throw new Error(`MCP request failed: HTTP ${response.status} ${await response.text()}`);
  const payload = await response.json();
  if (payload.error) throw new Error(`MCP error ${payload.error.code}: ${payload.error.message}`);
  return payload.result;
}

const initialized = await rpc({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-11-25',
    capabilities: {},
    clientInfo: { name: 'comrades-of-war-example', version: '1.2.0' },
  },
});

await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' });

const result = await rpc({
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'search_archive',
    arguments: { query, limit: 5 },
  },
});

if (initialized.protocolVersion !== '2025-11-25') {
  throw new Error(`Unexpected MCP protocol version: ${initialized.protocolVersion}`);
}
if (result.isError) throw new Error(result.content?.[0]?.text || 'MCP tool failed');

console.log(JSON.stringify(result.structuredContent, null, 2));
