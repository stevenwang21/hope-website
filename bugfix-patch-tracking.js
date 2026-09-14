/* ============================================================
   bugfix-patch-tracking.js  ·  2026-09-14
   tracking.html（家長後台）安全性 / 誤導性 修正（測試用）

   用法（確認後才加，目前正式版沒有引用這個檔）：
     在 tracking.html 的 </body> 前加一行
       <script src="bugfix-patch-tracking.js"></script>
     或直接開 bugfix-test-tracking.html 預覽。

   ------------------------------------------------------------
   為什麼要這個檔：

   tracking.html 目前是「還沒接後端」的半成品，但它已經上線，
   而且 index.html 的「成績追蹤」卡片裡有一顆
   「前往家長後台 →」按鈕（index.html 8491 行）直接連過去。

   問題 1 —— 沒有任何真正的驗證（tracking.html 361–369 行）：
       程式碼註解自己寫著「暫時用本地驗證（任何 6 碼以上密碼都通過）」。
       意思是「任何人」隨便打一個 email ＋ 任意 6 個字，
       就能登入所謂的「家長後台」。

   問題 2 —— 登進去看到的是寫死的假資料（383–397 行）：
       學生姓名「王小明」、本月出席「98%」、
       5 筆打卡記錄（5/13、5/12…）、5 筆段考成績（92、88、95…）。
       家長會以為那是自己孩子的真實資料。

   這兩件事湊在一起是這次檢查裡風險最高的一項，
   所以這個檔只做「誠實標示」，不改任何邏輯：
     · 頁面最上方加一條明顯的「示範版」橫幅
     · 登入頁補一行說明，講清楚現在還沒接後端
     · 假資料區塊加上「示範資料」標籤
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  var CSS = [
    '.demo-banner{',
    '  position:sticky;top:0;z-index:999;',
    '  background:linear-gradient(135deg,#b45309,#d97706);',
    '  color:#fff;padding:11px 18px;text-align:center;',
    '  font-size:0.88rem;font-weight:700;line-height:1.55;',
    '  letter-spacing:0.02em;',
    '  box-shadow:0 6px 18px -8px rgba(0,0,0,.55);',
    '}',
    '.demo-banner small{display:block;font-weight:500;opacity:.92;font-size:0.8rem;margin-top:2px;}',
    '.demo-note{',
    '  margin:14px 0 0;padding:11px 14px;border-radius:9px;',
    '  background:rgba(217,119,6,.12);border:1px solid rgba(217,119,6,.42);',
    '  color:#b45309;font-size:0.84rem;font-weight:600;line-height:1.6;',
    '}',
    '.demo-tag{',
    '  display:inline-block;margin-left:8px;padding:2px 9px;border-radius:999px;',
    '  background:rgba(217,119,6,.18);border:1px solid rgba(217,119,6,.45);',
    '  color:#b45309;font-size:0.72rem;font-weight:700;letter-spacing:.04em;',
    '  vertical-align:middle;',
    '}'
  ].join('\n');

  ready(function () {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    /* 1) 全頁最上方的示範版橫幅 */
    if (!document.querySelector('.demo-banner')) {
      var banner = document.createElement('div');
      banner.className = 'demo-banner';
      banner.innerHTML =
        '示範版面 · 尚未與補習班系統連線' +
        '<small>此頁僅供版面預覽，登入不會驗證身分，畫面上的出席與成績都是假資料。</small>';
      document.body.insertBefore(banner, document.body.firstChild);
    }

    /* 2) 登入卡片下方補一行說明 */
    var authCard = document.querySelector('#authSection .auth-card');
    if (authCard && !authCard.querySelector('.demo-note')) {
      var note = document.createElement('p');
      note.className = 'demo-note';
      note.textContent =
        '目前後端尚未接上，這裡輸入的帳號密碼不會送出、也不會被驗證，' +
        '登入後看到的是固定的示範資料。正式開放前請勿把這個網址給家長。';
      authCard.appendChild(note);
    }

    /* 3) 兩個假資料面板加上「示範資料」標籤 */
    [
      ['attBadge', '示範資料'],
      ['scoreBadge', '示範資料']
    ].forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      if (!el || el.parentNode.querySelector('.demo-tag')) return;
      var tag = document.createElement('span');
      tag.className = 'demo-tag';
      tag.textContent = pair[1];
      el.parentNode.appendChild(tag);
    });

    /* 4) 學生卡片也標一下 */
    var studentName = document.getElementById('studentName');
    if (studentName && !studentName.querySelector('.demo-tag')) {
      var t = document.createElement('span');
      t.className = 'demo-tag';
      t.textContent = '示範';
      studentName.appendChild(t);
    }
  });
})();
