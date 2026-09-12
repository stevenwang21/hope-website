#!/usr/bin/env node
/**
 * 檢查「希望補習班汪飛白」YouTube 頻道現在是不是正在直播，輸出到 live.json
 *
 * 用途：高三物理（線上同步直播）沒有固定可解析的上下課時間，
 *       不能用課表時間判斷「上課中」，改成真的去看頻道有沒有在直播。
 *
 * 執行：node scripts/fetch-live.js
 * 由 .github/workflows/update-live.yml 每三小時執行一次，不需要手動跑
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'live.json');

const CHANNEL_ID = 'UCRO0JksNRZDh7K40AflQC6Q'; // 希望補習班汪飛白
const LIVE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
const TIMEOUT_MS = 20000;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0 Safari/537.36';

async function getHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'zh-TW,zh;q=0.9',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function parseLive(html) {
  // 沒在直播時，/live 會導回頻道頁，抓不到這些欄位
  const isLiveNow = /"isLiveNow"\s*:\s*true/.test(html);
  const isLiveFlag = /"isLive"\s*:\s*true/.test(html);
  const hasHls = /hlsManifestUrl/.test(html);
  // 「即將直播」不算上課中
  const isUpcoming = /"isUpcoming"\s*:\s*true/.test(html);

  const live = !isUpcoming && (isLiveNow || (isLiveFlag && hasHls));
  if (!live) return { live: false };

  let videoId = '';
  const canonical = html.match(
    /<link\s+rel="canonical"\s+href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/
  );
  if (canonical) videoId = canonical[1];
  if (!videoId) {
    const vid = html.match(/"videoId"\s*:\s*"([\w-]{11})"/);
    if (vid) videoId = vid[1];
  }

  let title = '';
  const t = html.match(/<meta\s+name="title"\s+content="([^"]*)"/);
  if (t) {
    title = t[1]
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  return {
    live: true,
    videoId,
    title,
    url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : LIVE_URL,
  };
}

(async () => {
  let prev = null;
  try {
    prev = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  } catch (e) {}

  let info;
  try {
    const html = await getHtml(LIVE_URL);
    info = parseLive(html);
    console.log(info.live ? `✔ 直播中：${info.title || info.videoId}` : '– 目前沒有直播');
  } catch (err) {
    // 抓不到就保留上一次的結果，不要誤判成「沒直播」把徽章亂關掉
    console.error(`✘ 檢查失敗 (${err.message})，保留上次結果`);
    if (!prev) process.exit(1);
    return;
  }

  const out = {
    checkedAt: new Date().toISOString(),
    checkedAtTaipei: new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    }),
    channel: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    live: info.live,
    videoId: info.videoId || '',
    title: info.title || '',
    url: info.url || '',
  };

  // 直播狀態沒變就不重寫（避免每三小時都產生一個 commit）
  if (
    prev &&
    prev.live === out.live &&
    prev.videoId === out.videoId &&
    prev.title === out.title
  ) {
    console.log('狀態沒有變化，live.json 保持原樣');
    return;
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log('已寫入 live.json');
})();
