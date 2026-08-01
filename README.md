# Comrades of War — Spanish Gaming Community Archive API

[Comrades of War](https://comrades-of-war.com/agents) preserves nearly five years of activity from a popular Spanish Call of Duty clan and gaming community founded in 2010. From October 2010 to April 2015, the community grew into a rich concentration of SA-MP role-play stories, characters, rules, server records, and everyday community life.

The full archive preserves **110,023 posts across 21,400 topics and 90 forums**. To protect private and sensitive areas, the commercial agent catalog exposes a curated public collection of **39,309 posts across 5,857 topics and 32 sections**. Agents can search that collection for free, then pay only for the exact forum page needed.

- Search titles, dates, sections, post counts, and previews for free
- 110,023 posts preserved in the full historical archive
- 5,857 public topics and 39,309 posts exposed across 32 curated agent sections
- Citation-ready JSON or Markdown with authors, dates, conversation order, canonical URL, and source fingerprint
- `$0.10` USDC per individual forum page through [x402](https://www.x402.org/) on Base
- No API key, subscription, cookie handling, or HTML scraping required
- Retrieval, grounding, and citation permitted

Private/staff areas, disciplinary reports, ban appeals, applications, and other sensitive categories are excluded from the commercial API.

## What it helps an agent do

- Ground historical research or journalism in archived community discussions.
- Investigate Spanish Call of Duty clan culture and community-building in the early 2010s.
- Research SA-MP role-play stories, characters, rules, factions, and server life.
- Explore server operations, mods, tutorials, and the evolution of an online community.
- Compare community rules, technical problems, proposed fixes, and online culture across 2010–2015.
- Extract quotations with stable provenance instead of parsing legacy forum HTML.

The archive preserves first-hand community discussions from the period. Treat them as historical evidence and attributed statements, not as verified present-day facts.

## Install the agent skill

Install the portable Agent Skills package so compatible agents can search, validate, purchase, and cite archive pages safely:

```sh
npx skills add https://comrades-of-war.com --skill comrades-of-war-archive
```

The skill is also available for inspection at [`skills/comrades-of-war-archive/SKILL.md`](skills/comrades-of-war-archive/SKILL.md).

## Discover

```sh
curl https://comrades-of-war.com/agent/v1
curl https://comrades-of-war.com/agent/v1/catalog
curl 'https://comrades-of-war.com/agent/v1/search?q=servidor+rust&limit=5'
```

Search results include the title, forum, date, post count, excerpt, `canonical_path`, and ready-to-use `purchase_url`. Discovery and previews are free, so an agent can establish relevance before paying.

## Discover through A2A

A2A-compatible agents can discover the archive through the standard Agent Card:

```text
GET https://comrades-of-war.com/.well-known/agent-card.json
```

The same card is mirrored at `https://comrades-of-war-router.discoglobal.workers.dev/.well-known/agent-card.json` for registries whose bot probes cannot traverse the main domain's Cloudflare rules. Its preferred JSON-RPC `SendMessage` interface accepts concise Spanish search text and returns free previews as structured JSON, including an exact x402 `purchase_url` for every result. A2A search itself is free; payment is required only when the agent follows a purchase URL for an individual archive page.

Run the included A2A client:

```sh
npm run search:a2a -- "servidor rust"
```

## Discover through MCP

Connect any Streamable HTTP MCP client to:

```text
https://comrades-of-war-router.discoglobal.workers.dev/mcp
```

The server exposes two read-only tools: `archive_catalog` reports the corpus coverage, while `search_archive` returns free previews and the exact x402 purchase URL for each matching page. The remote endpoint uses the direct Worker hostname so automated clients are not mistaken for unwanted crawlers at the main-domain edge.

Run the included zero-dependency MCP client:

```sh
npm run search:mcp -- "servidor rust"
```

## Buy one individual forum page

```text
GET https://comrades-of-war.com/agent/v1/page?path=/comrades-rust-vt23474.html&format=json
```

The first request returns `402 Payment Required`. An x402 client pays `$0.10` USDC and retries automatically. Each payment retrieves the selected individual forum page; it does not unlock the whole website and may not contain every page of a paginated thread. Payment goes to the public Comrades of War treasury address on Base:

```text
0x2640b45a8F31bB24Ee7F40b3772Dba3Da27553c5
```

Run the included buyer example with a dedicated wallet that holds a small amount of USDC:

```sh
npm install
EVM_PRIVATE_KEY=0x... npm run buy -- /comrades-rust-vt23474.html
```

Never use a primary wallet or commit a private key. The example rejects a different network, asset, recipient, or price above `$0.10`.

For automated compatibility probes or a first purchase without query parameters, use the fixed sample route:

```text
GET https://comrades-of-war.com/agent/v1/page/sample
```

It charges the same `$0.10` per-page price and returns one defined historical page. Research agents should normally use free search and purchase the specific result relevant to their task.

## Example agent requests

- “Find and cite how a Spanish Call of Duty clan organized matches, servers, recruitment, and community life.”
- “Trace a SA-MP role-play storyline, its characters, factions, and rules across forum discussions.”
- “Compare recurring technical problems and proposed fixes across different years.”
- “Retrieve first-hand discussions about gaming communities and online culture in Spanish.”
- “Trace how community members discussed server changes, events, mods, and tutorials.”

## Machine documentation

- [Discovery JSON](https://comrades-of-war.com/agent/v1)
- [Public catalog](https://comrades-of-war.com/agent/v1/catalog)
- [OpenAPI](https://comrades-of-war.com/openapi.json)
- [x402 manifest](https://comrades-of-war.com/.well-known/x402)
- [A2A Agent Card](https://comrades-of-war.com/.well-known/agent-card.json)
- [MCP server manifest](https://comrades-of-war.com/.well-known/mcp/server.json)
- [Remote MCP server](https://comrades-of-war-router.discoglobal.workers.dev/mcp)
- [llms.txt](https://comrades-of-war.com/llms.txt)
- [Developer landing page](https://comrades-of-war.com/agents)

The paid route declares the official x402 Bazaar extension. After its first successful Mainnet settlement through the Coinbase Developer Platform facilitator, agents can also discover it through Coinbase Bazaar and its MCP server.

## Usage policy

Paid-resource use is permitted for retrieval, grounding, and citation. Model training, identity profiling, harassment, or attempts to access excluded categories are not permitted.

The code examples in this repository are MIT licensed. Archive content remains subject to the API usage policy and applicable rights; the MIT license does not apply to archive content.
