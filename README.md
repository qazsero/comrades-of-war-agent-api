# Comrades of War Agent Archive API

[Comrades of War](https://comrades-of-war.com/agents) provides machine-readable access to a curated Spanish-language gaming and role-play community archive from 2010–2015.

- Free catalog and search previews
- 5,857 public topics and 39,309 posts across 32 curated sections
- Structured JSON or Markdown with canonical provenance
- `$0.10` USDC per complete page through [x402](https://www.x402.org/) on Base
- Retrieval, grounding, and citation permitted

Private/staff areas, disciplinary reports, ban appeals, applications, and other sensitive categories are excluded from the commercial API.

## Discover

```sh
curl https://comrades-of-war.com/agent/v1
curl https://comrades-of-war.com/agent/v1/catalog
curl 'https://comrades-of-war.com/agent/v1/search?q=servidor+rust&limit=5'
```

Search results include a `canonical_path` and ready-to-use `purchase_url`. Discovery and previews are free.

## Buy one page

```text
GET https://comrades-of-war.com/agent/v1/page?path=/comrades-rust-vt23474.html&format=json
```

The first request returns `402 Payment Required`. An x402 client pays `$0.10` USDC and retries automatically. Payment goes to the public Comrades of War treasury address on Base:

```text
0x2640b45a8F31bB24Ee7F40b3772Dba3Da27553c5
```

Run the included buyer example with a dedicated wallet that holds a small amount of USDC:

```sh
npm install
EVM_PRIVATE_KEY=0x... npm run buy -- /comrades-rust-vt23474.html
```

Never use a primary wallet or commit a private key. The example rejects a different network, asset, recipient, or price above `$0.10`.

## Useful research prompts

- Find and cite discussions about operating a Rust or SA-MP community server.
- Compare technical problems and proposed fixes across different years.
- Retrieve primary-source discussions about gaming communities and online culture in Spanish.
- Trace how community members discussed server changes, events, mods, and tutorials.

## Machine documentation

- [Discovery JSON](https://comrades-of-war.com/agent/v1)
- [Public catalog](https://comrades-of-war.com/agent/v1/catalog)
- [OpenAPI](https://comrades-of-war.com/openapi.json)
- [x402 manifest](https://comrades-of-war.com/.well-known/x402)
- [llms.txt](https://comrades-of-war.com/llms.txt)
- [Developer landing page](https://comrades-of-war.com/agents)

The paid route declares the official x402 Bazaar extension. After its first successful Mainnet settlement through the Coinbase Developer Platform facilitator, agents can also discover it through Coinbase Bazaar and its MCP server.

## Usage policy

Paid-resource use is permitted for retrieval, grounding, and citation. Model training, identity profiling, harassment, or attempts to access excluded categories are not permitted.

The code examples in this repository are MIT licensed. Archive content remains subject to the API usage policy and applicable rights; the MIT license does not apply to archive content.
