/* ============================================================
   bugfix-patch.js  ·  2026-09-12
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

  });
})();
