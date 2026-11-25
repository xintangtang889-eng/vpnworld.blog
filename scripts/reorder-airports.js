/**
 * VPNWorld.blog - Airport Reordering Script
 * Reorders AIRPORTS in src/data/airports.ts strictly according to user's given ranking list:
 * 1. 微风网络 Breezenet
 * 2. 暮光网络
 * 3. 飞猫云
 * 4. 无忧
 * 5. 灵猫
 * 6. 闪跃 FlashLeap
 * 7. 萤火虫（Firefly）
 * 8. 跨界
 * 9. 隐形人
 * 10. 飞V
 * 11. 梯子云 LadderCloud
 * 12. 浪网 WaveNet
 * 13. 灵动云
 * 14. 全球云
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const airportsFilePath = path.join(ROOT_DIR, 'src/data/airports.ts');

const content = fs.readFileSync(airportsFilePath, 'utf-8');

// Extract the JSON array
const match = content.match(/export const AIRPORTS:\s*Airport\[\]\s*=\s*(\[[\s\S]*?\]);\s*export function getAirportBySlug/);
if (!match) {
  console.error('Could not find AIRPORTS array in airports.ts');
  process.exit(1);
}

const airports = JSON.parse(match[1]);

const targetOrder = [
  'breezenet',     // 1. 微风网络 Breezenet
  'muguang',       // 2. 暮光网络
  'feimaoyun',     // 3. 飞猫云
  'wuyou',         // 4. 无忧
  'lingmao',       // 5. 灵猫
  'flashleap',     // 6. 闪跃 FlashLeap
  'firefly',       // 7. 萤火虫（Firefly）
  'kuajiecloud',   // 8. 跨界
  'yinxingren',    // 9. 隐形人
  'feiv',          // 10. 飞V
  'laddercloud',   // 11. 梯子云 LadderCloud
  'wavenet',       // 12. 浪网 WaveNet
  'lingdongcloud', // 13. 灵动云
  'quanqiuyun'     // 14. 全球云
];

const reordered = targetOrder.map((id, index) => {
  const found = airports.find(a => a.id === id || a.slug === id);
  if (!found) {
    throw new Error(`Airport ${id} not found in database!`);
  }
  const score = parseFloat((9.9 - index * 0.1).toFixed(1));
  return {
    ...found,
    rank: index + 1,
    overallScore: score,
    rating: score
  };
});

const newTsContent = `export interface Plan {
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
  rank?: number;
  overallScore: number;
  stabilityScore?: number;
  valueScore?: number;
  rating?: number;
}

export const AIRPORTS: Airport[] = ${JSON.stringify(reordered, null, 2)};

export function getAirportBySlug(slug: string): Airport | undefined {
  return AIRPORTS.find(a => a.slug === slug || a.id === slug);
}
`;

fs.writeFileSync(airportsFilePath, newTsContent, 'utf-8');
console.log('✅ 14 个品牌排名已严格更新为用户指定的 1 至 14 顺序！');
reordered.forEach(a => console.log(`  第 ${a.rank} 名: ${a.name} (评分: ${a.overallScore})`));
