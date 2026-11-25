/**
 * VPNWorld.blog - IndexNow Submission Engine
 * Submits updated URLs directly to Bing & IndexNow-supported engines
 */

const https = require("https");

const CONFIG = {
  host: "vpnworld.blog",
  key: "c7e2b1093f4848d5b4a9238e8316c02a",
  keyLocation: "https://vpnworld.blog/c7e2b1093f4848d5b4a9238e8316c02a.txt",
  endpoint: "api.indexnow.org",
  path: "/indexnow"
};

// Default high-priority updated URLs to submit
const DEFAULT_URLS = [
  "https://vpnworld.blog/",
  "https://vpnworld.blog/recommend/budget/",
  "https://vpnworld.blog/recommend/premium/",
  "https://vpnworld.blog/ranking/overall/",
  "https://vpnworld.blog/ranking/value/",
  "https://vpnworld.blog/compare/",
  "https://vpnworld.blog/review/yinxingren/",
  "https://vpnworld.blog/review/breezenet/",
  "https://vpnworld.blog/review/wavenet/",
  "https://vpnworld.blog/review/flashleap/",
  "https://vpnworld.blog/review/feimaoyun/",
  "https://vpnworld.blog/review/feiv/",
  "https://vpnworld.blog/guides/windows/",
  "https://vpnworld.blog/blog/how-to-choose-airport/"
];

async function submitToIndexNow(urls, attempt = 1) {
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
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  console.log(`[IndexNow] 正在向 ${CONFIG.endpoint} 提交 ${urls.length} 个 URL (尝试次数: ${attempt})...`);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => { responseBody += chunk; });
      res.on("end", () => {
        const statusCode = res.statusCode;
        console.log(`[IndexNow] 响应状态码: ${statusCode}`);

        if (statusCode === 200 || statusCode === 202) {
          console.log(`[IndexNow] 提交成功！搜索引擎已接收推送列表。`);
          console.log(`[提示] 收到 IndexNow 响应仅代表搜索引擎已接收抓取通知，不代表 Bing 已经收录。实际收录需等待 Bingbot 抓取与质量审核。`);
          resolve({ success: true, statusCode });
        } else if (statusCode === 400) {
          console.error(`[IndexNow 错误 400] 格式无效，请检查 JSON 字段。`);
          resolve({ success: false, statusCode });
        } else if (statusCode === 403) {
          console.error(`[IndexNow 错误 403] Key 不匹配或 keyLocation 文件无法访问。`);
          resolve({ success: false, statusCode });
        } else if (statusCode === 422) {
          console.error(`[IndexNow 错误 422] URLs 包含非绑定的其他主机域名。`);
          resolve({ success: false, statusCode });
        } else if (statusCode === 429) {
          console.warn(`[IndexNow 警告 429] 提交过于频繁，请稍后再试。`);
          resolve({ success: false, statusCode });
        } else {
          console.log(`[IndexNow] 服务端返回: ${responseBody || "无返回信息"}`);
          resolve({ success: false, statusCode });
        }
      });
    });

    req.on("error", async (error) => {
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

// CLI Execution
async function main() {
  const argUrl = process.argv[2];
  let targetUrls = DEFAULT_URLS;

  if (argUrl && argUrl.startsWith("http")) {
    targetUrls = [argUrl];
    console.log(`[IndexNow] 单 URL 提交模式: ${argUrl}`);
  } else {
    console.log(`[IndexNow] 批量变更提交模式 (共 ${targetUrls.length} 个重点 URL)`);
  }

  try {
    await submitToIndexNow(targetUrls);
  } catch (err) {
    console.error(`[IndexNow] 提交过程遇到异常:`, err.message);
  }
}

main();
