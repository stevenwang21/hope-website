/* ============================================================
   bugfix-patch.js  ·  2026-09-15 更新（原 2026-09-12 / 09-14）
   希望文理補習班網站 bug 修正（測試用，未套進 index.html）

   用法：在 index.html 的 </body> 前加一行
         <script src="bugfix-patch.js"></script>
   或直接開 bugfix-test.html 預覽效果。

   ------------------------------------------------------------
   本次（09-15）複查後的異動：
   · #4 的「載入中... → 尚未上線」文字改寫已經不需要了，
     正式版 index.html 7995 行自己會處理，本檔只留下停用外觀 / 行為。
   · #A、#B 複查後確認「仍然存在」，原樣保留。
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* --------------------------------------------------------
       #4 未開放的聯絡簿：href="javascript:void(0)"
          （高一英文、高二數學、高三物理／化學／數學／英文）
          看起來可點、點了沒反應 → 標記為停用。
          外觀部分在 bugfix-patch.css。
       -------------------------------------------------------- */
    document.querySelectorAll('.homework-subject').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (/^javascript:void\(0\)/.test(href)) {
        a.setAttribute('aria-disabled', 'true');
        a.setAttribute('tabindex', '-1');
        a.removeAttribute('target');   // target="_blank" 配 javascript: 沒有意義
        a.addEventListener('click', function (e) { e.preventDefault(); });
      }
    });

    /* --------------------------------------------------------
       #5 <iframe ... decoding="async">（index.html 10829 行，
          Google 地圖）—— iframe 沒有 decoding 這個屬性，
          HTML 驗證會報「無效屬性」。功能不受影響，純粹清乾淨。
       -------------------------------------------------------- */
    document.querySelectorAll('iframe[decoding]').forEach(function (f) {
      f.removeAttribute('decoding');
    });

    /* --------------------------------------------------------
       #6 手機選單開著時切分頁 → 順手收起來，
          避免選單蓋在新分頁內容上。
          （index.html 11719 行只對 .nav-links a 做了這件事，
            底部導覽列的 .mob-nav-item 沒有。）
       -------------------------------------------------------- */
    var navLinks = document.getElementById('navLinks');
    if (navLinks) {
      document.querySelectorAll('.mob-nav-item').forEach(function (item) {
        item.addEventListener('click', function () {
          navLinks.classList.remove('active');
        });
      });
    }

    /* --------------------------------------------------------
       #A 手機底部導覽列「目前所在頁」永遠不會亮  ← 仍然存在

       index.html 的 initMobileBottomNav()（11873 行）是在
       結束於 12327 行的那段 <script> 裡「立即執行」的，
       但 <nav class="mobile-bottom-nav"> 的 HTML 在 12330 行，
       比腳本還後面才被瀏覽器解析出來。
       結果 document.querySelectorAll('.mob-nav-item') 抓到 0 個，
       函式在 `if (!items.length) return;`（11875 行）就直接結束，
       MutationObserver 從來沒有被掛上去
       → 五個項目沒有任何一個會變成黑底白字的 is-active 狀態。

       → 這裡在 DOMContentLoaded 之後重新實作一次。
       （正式版的根治做法：把那個 <nav> 搬到 </script> 之前，
         或把 initMobileBottomNav 包進 DOMContentLoaded。）
       -------------------------------------------------------- */
    (function fixMobileBottomNavActive() {
      var items = document.querySelectorAll('.mob-nav-item');
      if (!items.length) return;

      function update() {
        var current = document.body.getAttribute('data-current') || 'home';
        items.forEach(function (item) {
          item.classList.toggle('is-active',
            item.getAttribute('data-page') === current);
        });
      }
      update();

      if (window.MutationObserver) {
        new MutationObserver(update).observe(document.body, {
          attributes: true,
          attributeFilter: ['data-current']
        });
      } else {
        window.addEventListener('hashchange', update);
      }
    })();

    /* --------------------------------------------------------
       #B 首頁故事區的影片縮圖點下去，彈窗會開，但裡面是空的
          ← 仍然存在

       #storyVideoLink（8302 行）的 click 處理（12320 行）
       只做了「modal.hidden = false」＋加上 is-open class，
       沒有呼叫 teacherVideoModalsInit()（10063 行）裡的
         · mountLive(modal)       → 建立課堂實錄的 YouTube iframe
         · window.wangDbLayout()  → 重算「理化 DATABASE」扇形排版
       （這兩個只有從師資頁點汪老師卡片進去時，
         10126–10127 行才會被呼叫。）

       結果：從首頁進去看到的是空白影片框 ＋ 沒排好的清單，
       從師資頁進去卻是正常的。

       → 讓 storyVideoLink 改為「轉交」給 #teacherWang 的完整流程。
       -------------------------------------------------------- */
    (function fixStoryVideoModal() {
      var link = document.getElementById('storyVideoLink');
      var teacherWang = document.getElementById('teacherWang');
      if (!link || !teacherWang) return;

      // 這個 listener 比 index.html 內建的晚註冊，所以會在它之後執行：
      // 彈窗已經被打開，這裡只負責把缺掉的初始化補上。
      link.addEventListener('click', function (e) {
        e.preventDefault();
        teacherWang.click();   // 走完整的 open()：mountLive + wangDbLayout
      });
    })();

  });
})();
