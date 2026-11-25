import fs from 'node:fs';
import path from 'node:path';

const jsCode = fs.readFileSync('js/airports.js', 'utf8');
const match = jsCode.match(/const AIRPORTS_DATA = (\[[\s\S]*?\]);\s*if \(typeof window/);
const rawData = eval(match[1]);

const tsContent = `export interface Plan {
  name: string;
  price: number;
  traffic: number;
  period: string;
  perGbCost: number;
  unitPriceMonthly: number;
}

export interface Airport {
  id: string;
  name: string;
  slug: string;
  description: string;
  officialUrl: string;
  affiliateUrl: string;
  coupon?: string;
  startingPrice: number;
  currency: string;
  billingCycle: string;
  traffic: string;
  plans: Plan[];
  protocols: string[];
  lineType: string;
  regions: string[];
  deviceLimit: string;
  aiSupport: string[];
  streamingSupport: string[];
  advantages: string[];
  disadvantages: string[];
  suitableFor: string[];
  sources: string[];
  lastVerified: string;
  testStatus: "tested" | "official-data" | "unverified";
  rating: number;
}

export const AIRPORTS: Airport[] = ${JSON.stringify(rawData, null, 2)};

export function getAirportBySlug(slug: string): Airport | undefined {
  return AIRPORTS.find(a => a.slug === slug || a.id === slug);
}
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/airports.ts', tsContent, 'utf8');
console.log('Successfully generated src/data/airports.ts with', rawData.length, 'brands.');
