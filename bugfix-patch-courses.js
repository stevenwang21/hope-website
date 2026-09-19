/* ============================================================
   bugfix-patch-courses.js  ·  2026-09-19（新檔）
   線上補課區 courses.html 的 bug 修正（測試用，未套進 courses.html）

   用法：在 courses.html 的 <head> 裡、**在那段內嵌 <script> 之前**加一行
         <script src="bugfix-patch-courses.js"></script>
   （必須放在前面，因為它要先換掉 console 才來得及攔住。）

   ⚠ 這個檔是「止血用」的。
      真正該做的是直接刪掉 courses.html 的那 4 行 console，
      見下面每一段的「正式版的根治做法」。

   ------------------------------------------------------------
   #1【高】使用者的登入／註冊密碼被完整寫進瀏覽器 console

      courses.html 1206–1226 行的 callApi() 裡：

        async function callApi(action, data) {
          const fd = new FormData();
          fd.append('action', action);
          Object.keys(data || {}).forEach(k => fd.append(k, data[k]));
          console.log('[callApi] →', action, data);        ← 1210 行
          ...
          console.log('[callApi] ← HTTP', res.status, ...); ← 1218 行
          const text = await res.text();
          console.log('[callApi] body:', text.slice(0, 500)); ← 1220 行
        }

      而 1264 行與 1289 行傳進來的 data 長這樣：

        { email: '……@gmail.com', password: '使用者剛打的密碼' }

      也就是說，家長在線上補課區登入或註冊時，
      **帳號和密碼會以明文印在 F12 的 Console 分頁裡**。

      誰看得到：
        · 家長自己按 F12（不太會，但學生會）
        · 在旁邊看螢幕的人
        · **任何有「讀取這個網站資料」權限的瀏覽器擴充套件**
          —— 擴充套件讀 console 是不需要額外權限的
        · 家長把畫面截圖傳給您求助時，如果 console 是開的

      1220 行那一行還會把後端回來的整包 JSON 前 500 字印出來，
      如果 Apps Script 有回傳其他學生的資料，也會一起被印出來。

      這幾行看得出來是當初接 Apps Script 時的除錯用，忘了拿掉。

      → 本檔的止血法：把 console.log / console.error 包一層，
        凡是 '[callApi]' 開頭的訊息一律丟掉，其餘照常。

      → **正式版的根治做法：把 1210、1218、1220、1215 這四行刪掉。**
        真的想留除錯訊息的話，至少改成不要印 data：
          console.log('[callApi] →', action);
   ------------------------------------------------------------
   #2【小】後端出錯時，把技術訊息直接丟到家長眼前

      courses.html 1224 行：
        throw new Error('NOT_JSON (HTTP ' + res.status + '): ' + text.slice(0, 200));
      再由 1275 / 1301 行顯示成：
        showMsg(loginMsg, '錯誤：' + (err.message || err), true);

      Apps Script 一旦掛掉或改權限，回來的是一整頁 HTML 錯誤頁，
      家長會在登入框下面看到像
      「錯誤：NOT_JSON (HTTP 302): <!DOCTYPE html><html lang="en"…」
      這種東西。看不懂、也不知道該怎麼辦，而且會露出後端細節。

      → 本檔把畫面上的訊息換成人話，技術細節仍然保留在 console
        （但只在網址加上 ?debug=1 時才印，平常不印）。

      → 正式版的根治做法：在 1275 / 1301 行改成固定文案，例如
        「系統忙線中，請稍後再試，或直接用 LINE 與我們聯絡。」
   ============================================================ */
(function () {
  'use strict';

  var DEBUG = /[?&]debug=1\b/.test(location.search);

  /* ---------- #1 擋掉 [callApi] 的 console 輸出 ---------- */
  ['log', 'error', 'warn', 'info', 'debug'].forEach(function (level) {
    var original = console[level];
    if (typeof original !== 'function') return;
    console[level] = function () {
      var first = arguments[0];
      if (typeof first === 'string' && first.indexOf('[callApi]') === 0) {
        if (!DEBUG) return;                       // 平常：整筆丟掉
        // ?debug=1 時仍然印，但把 password 遮掉
        var args = Array.prototype.map.call(arguments, function (a) {
          if (a && typeof a === 'object' && 'password' in a) {
            var copy = {};
            Object.keys(a).forEach(function (k) {
              copy[k] = (k === 'password') ? '••••（已遮蔽）' : a[k];
            });
            return copy;
          }
          return a;
        });
        return original.apply(console, args);
      }
      return original.apply(console, arguments);
    };
  });

  /* ---------- #2 把技術錯誤訊息換成人話 ---------- */
  var FRIENDLY = '系統忙線中，請稍後再試，或直接用 LINE 與我們聯絡。';

  function tidy(el) {
    if (!el || !el.classList.contains('is-error')) return;
    var t = el.textContent || '';
    if (/NOT_JSON|FETCH_FAILED|HTTP \d{3}|<!DOCTYPE|<html/i.test(t)) {
      if (DEBUG) console.warn('[patch] 原始錯誤訊息：', t);
      el.textContent = FRIENDLY;
    }
  }

  function watch(id) {
    var el = document.getElementById(id);
    if (!el || !window.MutationObserver) return;
    new MutationObserver(function () { tidy(el); })
      .observe(el, { childList: true, characterData: true, subtree: true });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    watch('loginMsg');
    watch('regMsg');
  });
})();
