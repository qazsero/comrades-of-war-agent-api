import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
import { privateKeyToAccount } from 'viem/accounts';

const BASE_MAINNET = 'eip155:8453';
const BASE_USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const TREASURY = '0x2640b45a8F31bB24Ee7F40b3772Dba3Da27553c5';
const MAX_PRICE_ATOMIC = 100_000n;

if (!process.env.EVM_PRIVATE_KEY) throw new Error('Set EVM_PRIVATE_KEY to a dedicated Base buyer wallet.');

const useJsonBody = process.argv.includes('--post');
const path = process.argv.slice(2).find((argument) => !argument.startsWith('--')) || '/comrades-rust-vt23474.html';
if (!/^\/[a-zA-Z0-9_%!(),.+-]+-vt\d+(?:\.start-\d+)?\.html$/.test(path)) {
  throw new Error('Pass a canonical topic path returned by /agent/v1/search.');
}

const signer = privateKeyToAccount(process.env.EVM_PRIVATE_KEY);
const paidFetch = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{ network: BASE_MAINNET, client: new ExactEvmScheme(signer) }],
  policies: [(_version, requirements) => requirements.filter((requirement) => (
    requirement.network === BASE_MAINNET &&
    requirement.asset.toLowerCase() === BASE_USDC.toLowerCase() &&
    requirement.payTo.toLowerCase() === TREASURY.toLowerCase() &&
    BigInt(requirement.amount) <= MAX_PRICE_ATOMIC
  ))],
});

const url = new URL('https://comrades-of-war.com/agent/v1/page');
if (!useJsonBody) {
  url.searchParams.set('path', path);
  url.searchParams.set('format', 'json');
}

const response = await paidFetch(url, {
  method: useJsonBody ? 'POST' : 'GET',
  headers: {
    accept: 'application/json',
    ...(useJsonBody ? { 'content-type': 'application/json' } : {}),
    'user-agent': 'ComradesOfWar-x402-Buyer-Example/1.0',
  },
  ...(useJsonBody ? { body: JSON.stringify({ path, format: 'json' }) } : {}),
});
const body = await response.text();
if (!response.ok) throw new Error(`Paid request failed with HTTP ${response.status}: ${body}`);

console.log(body);
