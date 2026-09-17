/* ============================================================
   bugfix-patch.js  ·  2026-09-17 更新（原 09-12 / 09-14 / 09-15 / 09-16）
   希望文理補習班網站 bug 修正（測試用，未套進 index.html）

   用法：在 index.html 的 </body> 前加一行
         <script src="bugfix-patch.js"></script>
   或直接開 bugfix-test.html 預覽效果。

   ------------------------------------------------------------
   本次（09-17）的異動：
   · index.html 仍是 09-15 的版本（12,861 行），#4/#5/#6/#A/#B/#C
     全部複查過，確認「仍然存在」，原樣保留。
   · 新增 #D：汪老師「理化 DATABASE」的「課程教材」「筆記及詳解」
     顯示「3 份講義 ›」，點進去三筆卻全是準備中。
   · 新增 #E：同一個小節 3-2 在 WANG_DB 裡有「酸與鹼」「酸和鹼」兩種寫法。
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

    /* --------------------------------------------------------
       #C 聯絡簿卡片的日期會把「很舊的文章」講成像是今年的  ← 新

       index.html 的 applyHomeworkDates()（8275 行）是直接把
       dates.json 裡的 label 原封不動貼上去，而 label 只有月/日：

         "11-chemistry": {
           "date": "2024-07-09",
           "label": "7/9 更新",      ← 畫面上就長這樣
           "title": "",
           "blog": "https://h2ch22.blogspot.com"
         }

       這篇其實是 2024 年 7 月的文章（已經兩年多沒更新了），
       但高二化學那張卡片上只會寫「7/9 更新」——
       家長看到會直接理解成「今年 7 月」。

       → 這裡重新讀一次 dates.json，凡是「不是今年」的日期
         就把年份補上去（例：「2024/7/9 更新」），
         超過 180 天的再加一個淡掉的樣式提示。
         今年的維持原樣，不動。

       （正式版的根治做法：在 applyHomeworkDates 裡用 d.date 判斷年份；
         但真正該處理的是「h2ch22 這個部落格兩年沒更新了」這件事，
         程式只能誠實顯示，不能把內容變新。）
       -------------------------------------------------------- */
    (function fixStaleHomeworkDates() {
      var STALE_DAYS = 180;

      function toDate(s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
        if (!m) return null;
        var d = new Date(+m[1], +m[2] - 1, +m[3]);
        return isNaN(d.getTime()) ? null : d;
      }

      function apply(dates) {
        var now = new Date();
        var thisYear = now.getFullYear();

        document.querySelectorAll('.homework-subject[data-grade][data-subject]')
          .forEach(function (card) {
            var key = card.getAttribute('data-grade') + '-' +
                      card.getAttribute('data-subject');
            var d = dates[key];
            var hint = card.querySelector('.homework-subject-hint');
            if (!d || !hint) return;

            var dt = toDate(d.date);
            if (!dt) return;

            var ageDays = Math.floor((now - dt) / 86400000);

            // 不是今年 → 在 label 前面補上年份，避免被當成今年
            if (dt.getFullYear() !== thisYear) {
              var label = d.label || '';
              // 只補一次，重跑時不會變成 "2024/2024/7/9"
              if (label.indexOf(String(dt.getFullYear())) === -1) {
                hint.textContent = dt.getFullYear() + '/' + label;
              }
            }

            // 超過半年沒更新 → 標記出來（樣式在 bugfix-patch.css 可自行調整）
            if (ageDays > STALE_DAYS) {
              card.setAttribute('data-stale', 'true');
              hint.title = '最後更新：' + d.date + '（約 ' + ageDays + ' 天前）';
            }
          });
      }

      // 正式版自己也會 fetch dates.json 並覆寫 hint，
      // 這裡晚一步再跑一次，確保蓋在它後面。
      fetch('dates.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (json) {
          if (!json || !json.dates) return;
          setTimeout(function () { apply(json.dates); }, 300);
        })
        .catch(function () { /* 抓不到就算了，維持正式版原本的顯示 */ });
    })();

    /* --------------------------------------------------------
       #D 理化 DATABASE：「有 3 份講義」其實一份都打不開  ← 新

       index.html 10302 行的 countOf() 是這樣數的：

         function countOf(it) {
           return groupsOf(it).reduce(function (a, g) {
             return a + (g.lessons || []).length;
           }, 0);
         }

       它只數「有幾筆 lessons」，不管那一筆到底有沒有連結。
       而「04 課程教材」「05 筆記及詳解」在 WANG_DB 裡是這樣寫的
       （10238–10260 行）：

         { no: '3-1', title: '電解質',           url: '' },
         { no: '3-2', title: '酸和鹼',           url: '' },
         { no: '3-3', title: '酸鹼的濃度與 pH 值', url: '' }

       三筆的 url 都是空字串。於是：
         · 選單上 n = 3 → 不會加 is-soon，寫著「3 份講義」還帶一個 › 箭頭，
           看起來跟「02 課程影片」「03 題型解析」那兩個真的有影片的一模一樣；
         · 但 openPop() 裡 link 是空的 → on = false → 三筆全部
           渲染成 is-soon 的 <span> 加一個時鐘圖示，點不動。

       家長／學生點進去會以為是壞掉，而不是「還沒上架」。

       → 這裡把「沒有 id、url 也是空」的小節先從 WANG_DB 濾掉，
         讓 countOf() 數出來的就是「真的打得開的數量」。
         濾完是 0 的單元整個拿掉，項目就會自動變成「內容準備中」的樣子。
         切年級時正式版會自己重跑 renderItems()，讀到的已經是濾過的資料，
         所以只要補上「第一次渲染」那一次就好。

       （正式版的根治做法：countOf() 改成只數 l.id 或 l.url 非空的小節。）
       -------------------------------------------------------- */
    (function fixEmptyDatabaseItems() {
      var DB = window.WANG_DB;
      if (!DB || !Array.isArray(DB.items)) return;

      function usable(l) {
        if (!l) return false;
        if (l.id && String(l.id).trim()) return true;
        if (l.url && String(l.url).trim()) return true;
        return false;
      }

      // 把每個年級（或 shared）裡「打不開」的小節濾掉
      function clean(groups) {
        if (!Array.isArray(groups)) return groups;
        return groups
          .map(function (g) {
            g.lessons = (g.lessons || []).filter(usable);
            return g;
          })
          .filter(function (g) { return g.lessons.length > 0; });
      }

      DB.items.forEach(function (it) {
        if (Array.isArray(it.shared)) it.shared = clean(it.shared);
        if (it.byGrade) {
          Object.keys(it.byGrade).forEach(function (g) {
            it.byGrade[g] = clean(it.byGrade[g]);
          });
        }
      });

      /* 第一次的畫面是在 patch 載入前就渲染好的，這裡就地更正 */
      function currentGrade() {
        var on = document.querySelector('#wangGrades .grade-tab.is-on');
        return on ? on.getAttribute('data-g') : (DB.grades && DB.grades[0]);
      }
      function groupsOf(it, grade) {
        if (it.shared) return it.shared;
        return (it.byGrade && it.byGrade[grade]) || [];
      }

      function refresh() {
        var grade = currentGrade();
        document.querySelectorAll('#wangDb .db-item').forEach(function (btn) {
          var i  = +btn.getAttribute('data-i');
          var it = DB.items[i];
          if (!it) return;

          var groups  = groupsOf(it, grade);
          var lessons = groups.reduce(function (a, g) {
            return a.concat(g.lessons || []);
          }, []);
          var n = lessons.length;

          var meta = btn.querySelector('.db-item-meta');
          if (meta) {
            var word = lessons.some(function (l) { return l.id !== undefined; })
              ? '部影片' : '份講義';
            meta.textContent = n ? (n + ' ' + word) : '內容準備中';
          }

          btn.classList.toggle('is-soon', !n);
          var arrow = btn.querySelector('.db-item-arrow');
          if (!n && arrow) arrow.remove();
        });
      }

      refresh();
      // 切年級後正式版會自己重畫；這裡再跑一次純粹保險（重跑無副作用）
      var tabs = document.getElementById('wangGrades');
      if (tabs) tabs.addEventListener('click', function () { setTimeout(refresh, 0); });
    })();

    /* --------------------------------------------------------
       #E 同一個小節，兩種寫法  ← 新

       8 下第三章的 3-2 在 WANG_DB 裡出現四次：
         10219 行（02 課程影片）      → 「酸與鹼」
         10231 行（03 題型解析）      → 「酸和鹼」
         10243 行（04 課程教材）      → 「酸和鹼」
         10255 行（05 筆記及詳解）    → 「酸和鹼」

       同一份教材在同一個彈窗裡切項目就換一種寫法，看起來像打錯字。
       課本用的是「酸和鹼」，四比一，這裡統一成「酸和鹼」。

       （正式版的根治做法：把 10219 行的「酸與鹼」改成「酸和鹼」。）
       -------------------------------------------------------- */
    (function fixLessonTitleTypo() {
      var DB = window.WANG_DB;
      if (!DB || !Array.isArray(DB.items)) return;

      var FIX = { '酸與鹼': '酸和鹼' };
      var has  = Object.prototype.hasOwnProperty;

      function walk(groups) {
        (groups || []).forEach(function (g) {
          (g.lessons || []).forEach(function (l) {
            if (l && has.call(FIX, l.title)) l.title = FIX[l.title];
          });
        });
      }

      DB.items.forEach(function (it) {
        if (it.shared) walk(it.shared);
        if (it.byGrade) Object.keys(it.byGrade).forEach(function (g) {
          walk(it.byGrade[g]);
        });
      });
    })();

  });
})();
