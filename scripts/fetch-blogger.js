#!/usr/bin/env node
/**
 * 抓每個 Blogger 部落格最新一篇文章的日期，輸出到 dates.json
 *
 * 來源：index.html 裡所有 .homework-subject 卡片的 data-blog（或 href）blogspot 網址
 * 執行：node scripts/fetch-blogger.js
 * 由 .github/workflows/update-dates.yml 定時執行，不需要手動跑
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT, 'index.html');
const OUT_FILE = path.join(ROOT, 'dates.json');
const TIMEOUT_MS = 15000;

// ---- 1. 從 index.html 找出所有「年級-科目 → 部落格網址」 ----
function collectBlogs(html) {
  const blogs = {};
  const cardRe = /<a\s+class="homework-subject"([^>]*)>/g;
  let m;
  while ((m = cardRe.exec(html))) {
    const attrs = m[1];
    const get = (name) => {
      const r = new RegExp(`\\b${name}="([^"]*)"`).exec(attrs);
      return r ? r[1] : '';
    };
    const grade = get('data-grade');
    const subject = get('data-subject');
    if (!grade || !subject) continue;

    let url = get('data-blog') || get('href');
    if (!/^https?:\/\/[^/]+\.blogspot\.com/.test(url)) continue;
    url = url.replace(/\/+$/, '');
    blogs[`${grade}-${subject}`] = url;
  }
  return blogs;
}

// ---- 2. 抓 Blogger JSON feed，回傳最新文章日期 ----
async function fetchLatest(blogUrl) {
  const feedUrl = `${blogUrl}/feeds/posts/default?alt=json&max-results=1&orderby=published`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(feedUrl, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ourhope-dates-bot/1.0 (+https://ourhope.com.tw)' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const entry = data && data.feed && data.feed.entry && data.feed.entry[0];
    if (!entry) return null; // 部落格還沒有文章

    const published = entry.published && entry.published.$t;
    const updated = entry.updated && entry.updated.$t;
    const title = entry.title && entry.title.$t;
    const link = (entry.link || []).find((l) => l.rel === 'alternate');

    // 以「發表日期」為主（改文章不算新聯絡簿），沒有才用 updated
    const iso = published || updated;
    if (!iso) return null;
    return { iso, title: title || '', url: link ? link.href : blogUrl };
  } finally {
    clearTimeout(timer);
  }
}

// ---- 3. 轉成台灣時區的顯示文字 ----
function formatTaipei(iso) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t).value;
  const y = get('year'), mo = get('month'), da = get('day');
  return {
    date: `${y}-${mo}-${da}`,                    // 2026-09-08
    label: `${Number(mo)}/${Number(da)} 更新`,   // 9/8 更新
  };
}

// ---- main ----
(async () => {
  const html = fs.readFileSync(INDEX_FILE, 'utf8');
  const blogs = collectBlogs(html);
  const keys = Object.keys(blogs);
  console.log(`找到 ${keys.length} 個部落格`);

  // 讀舊的 dates.json，抓失敗時保留舊值
  let prev = {};
  try { prev = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')).dates || {}; } catch (e) {}

  const dates = {};
  let failed = 0;

  await Promise.all(keys.map(async (key) => {
    const url = blogs[key];
    try {
      const latest = await fetchLatest(url);
      if (latest) {
        const f = formatTaipei(latest.iso);
        dates[key] = { date: f.date, label: f.label, title: latest.title, url: latest.url, blog: url };
        console.log(`✔ ${key.padEnd(14)} ${f.date}  ${latest.title}`);
      } else {
        dates[key] = { date: null, label: '尚無文章', title: '', url, blog: url };
        console.log(`– ${key.padEnd(14)} 沒有文章`);
      }
    } catch (err) {
      failed++;
      if (prev[key]) {
        dates[key] = prev[key];
        console.log(`✘ ${key.padEnd(14)} 抓取失敗 (${err.message})，沿用舊值 ${prev[key].date}`);
      } else {
        dates[key] = { date: null, label: '看最新聯絡簿', title: '', url, blog: url };
        console.log(`✘ ${key.padEnd(14)} 抓取失敗 (${err.message})`);
      }
    }
  }));

  // key 排序，讓 diff 乾淨
  const sorted = {};
  Object.keys(dates).sort().forEach((k) => { sorted[k] = dates[k]; });

  // 日期內容完全沒變就不重寫檔案（避免每小時都產生一個 commit、觸發 Netlify 重新部署）
  if (JSON.stringify(sorted) === JSON.stringify(prev)) {
    console.log('\n日期沒有變化，dates.json 保持原樣');
    return;
  }

  const out = {
    updatedAt: new Date().toISOString(),
    updatedAtTaipei: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false }),
    dates: sorted,
  };
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`\n已寫入 dates.json（${keys.length - failed} 成功 / ${failed} 失敗）`);

  // 全部失敗才視為錯誤（避免 Blogger 暫時掛掉時把舊資料洗掉）
  if (keys.length > 0 && failed === keys.length) {
    console.error('全部抓取失敗，中止');
    process.exit(1);
  }
})();
