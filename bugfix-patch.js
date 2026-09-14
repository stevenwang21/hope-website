/* ============================================================
   bugfix-patch.js  ·  2026-09-12（2026-09-14 更新）
   希望文理補習班網站 bug 修正（測試用，未套進 index.html）
   用法：在 index.html 的 </body> 前加一行
         <script src="bugfix-patch.js"></script>
   或直接開 bugfix-test.html 預覽效果。
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
          看起來可點、點了沒反應 → 標記為停用。
          （高一英文、高二數學、高三物理／化學／數學／英文）
       -------------------------------------------------------- */
    document.querySelectorAll('.homework-subject').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (/^javascript:void\(0\)/.test(href)) {
        a.setAttribute('aria-disabled', 'true');
        a.setAttribute('tabindex', '-1');
        a.removeAttribute('target');
        a.addEventListener('click', function (e) { e.preventDefault(); });
        var hint = a.querySelector('.homework-subject-hint');
        if (hint && (hint.textContent === '載入中...' || !hint.textContent.trim())) {
          hint.textContent = '尚未上線';
        }
      }
    });

    /* --------------------------------------------------------
       #5 <iframe decoding="async"> —— iframe 沒有 decoding 屬性，
          HTML 驗證會報無效屬性（Google 地圖那個 iframe）。
       -------------------------------------------------------- */
    document.querySelectorAll('iframe[decoding]').forEach(function (f) {
      f.removeAttribute('decoding');
    });

    /* --------------------------------------------------------
       #6 手機選單開著時切分頁 → 順手收起來，
          避免選單蓋在新分頁內容上。
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
       #A【新・2026-09-14】手機底部導覽列「目前所在頁」永遠不會亮

       index.html 的 initMobileBottomNav()（約 11831 行）是在
       第 10950 行那段 <script> 裡「立即執行」的，
       但 <nav class="mobile-bottom-nav"> 的 HTML 在第 12288 行，
       比腳本還後面才被瀏覽器解析出來。
       結果 document.querySelectorAll('.mob-nav-item') 抓到 0 個，
       函式在 `if (!items.length) return;` 就直接結束，
       MutationObserver 從來沒有被掛上去
       → 五個項目沒有任何一個會變成黑底白字的 is-active 狀態。

       （同一段程式裡的 initScrollNav 已經有註解說明「這段腳本比
         底部導覽列的 HTML 早執行，所以要延遲查找」並做了處理，
         initMobileBottomNav 漏做。）

       → 這裡在 DOMContentLoaded 之後重新實作一次。
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
       #B【新・2026-09-14】首頁故事區的影片縮圖點下去，
          彈窗會開，但裡面是空的

       #storyVideoLink（8287 行）的 click 處理（12272 行那段）
       只做了「modal.hidden = false」＋加上 is-open class，
       沒有呼叫 teacherVideoModalsInit() 裡的
         · mountLive(modal)       → 建立課堂實錄的 YouTube iframe
         · window.wangDbLayout()  → 重算「理化 DATABASE」扇形排版
       （這兩個只有從師資頁點汪老師卡片進去時才會被呼叫。）

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
