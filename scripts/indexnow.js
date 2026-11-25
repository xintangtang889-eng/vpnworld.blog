/**
 * VPNWorld.blog - Astro IndexNow Submission Engine
 * Submits updated URLs directly to Bing & IndexNow-supported engines
 */

import https from 'node:https';

const CONFIG = {
  host: 'vpnworld.blog',
  key: 'c7e2b1093f4848d5b4a9238e8316c02a',
  keyLocation: 'https://vpnworld.blog/c7e2b1093f4848d5b4a9238e8316c02a.txt',
  endpoint: 'api.indexnow.org',
  path: '/indexnow'
};

const DEFAULT_URLS = [
  'https://vpnworld.blog/',
  'https://vpnworld.blog/recommend/budget/',
  'https://vpnworld.blog/recommend/premium/',
  'https://vpnworld.blog/ranking/overall/',
  'https://vpnworld.blog/ranking/value/',
  'https://vpnworld.blog/compare/',
  'https://vpnworld.blog/review/yinxingren/',
  'https://vpnworld.blog/review/breezenet/',
  'https://vpnworld.blog/review/wavenet/',
  'https://vpnworld.blog/review/flashleap/',
  'https://vpnworld.blog/review/feimaoyun/',
  'https://vpnworld.blog/review/feiv/',
  'https://vpnworld.blog/guides/windows-clash-setup/',
  'https://vpnworld.blog/blog/how-to-choose-airport/'
];

export async function submitToIndexNow(urls = DEFAULT_URLS, attempt = 1) {
  const payload = JSON.stringify({
    host: CONFIG.host,
    key: CONFIG.key,
    keyLocation: CONFIG.keyLocation,
    urlList: urls
  });

  const options = {
    hostname: CONFIG.endpoint,
    port: 443,
    path: CONFIG.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  console.log(`[IndexNow] 正在向 ${CONFIG.endpoint} 提交 ${urls.length} 个 URL (尝试次数: ${attempt})...`);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        const statusCode = res.statusCode;
        console.log(`[IndexNow] 响应状态码: ${statusCode}`);

        if (statusCode === 200 || statusCode === 202) {
          console.log(`[IndexNow] 提交成功！搜索引擎已接收推送列表。`);
          resolve({ success: true, statusCode });
        } else {
          console.log(`[IndexNow] 返回代码: ${statusCode}, 消息: ${responseBody || '无返回信息'}`);
          resolve({ success: false, statusCode });
        }
      });
    });

    req.on('error', async (error) => {
      console.error(`[IndexNow 网络错误] ${error.message}`);
      if (attempt < 3) {
        console.log(`[IndexNow] 3秒后进行第 ${attempt + 1} 次重试...`);
        await new Promise((r) => setTimeout(r, 3000));
        resolve(await submitToIndexNow(urls, attempt + 1));
      } else {
        reject(error);
      }
    });

    req.write(payload);
    req.end();
  });
}

// Direct execution
if (process.argv[1] && process.argv[1].endsWith('indexnow.js')) {
  submitToIndexNow().then(res => {
    console.log(`[IndexNow] 执行完毕`);
  }).catch(err => {
    console.error(`[IndexNow] 失败:`, err.message);
  });
}
