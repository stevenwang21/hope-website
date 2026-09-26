/* ============================================================
   bugfix-patch.js  ·  2026-09-24 更新
                      （原 09-12 / 09-14 / 09-15 / 09-16 / 09-17 /
                        09-18 / 09-19 / 09-20 / 09-21 / 09-23）
   希望文理補習班網站 bug 修正（測試用，未套進 index.html）

   用法：在 index.html 的 </body> 前加一行
         <script src="bugfix-patch.js"></script>
   或直接開 bugfix-test.html 預覽效果。

   ------------------------------------------------------------
   本次（09-24）的異動：
   · index.html 仍是 13,362 行，與 9/23 完全相同
     （最後一個 commit 是 9/22 的「SEO：結構化資料網址統一、
       sitemap 更新日期」）。
     #4 / #5 / #6 / #A / #C / #D / #E / #F / #G / #H / #I / #J / #K /
     #L / #M / #N / #O / #P / #Q 全部複查後確認「仍然存在」，原樣保留。
   · #F 的過期活動今天（9/24）已經過期 83 天。
   · 新增 #R：整個首頁**沒有任何 <h1>**。← 本次最重要
     9/22 的「移除首頁大標題」把唯一的 h1 一起拿掉了，
     而同一天還有兩個 SEO commit，所以這顯然不是故意的。
   · 新增 #S：師資輪播那八顆圓點**完全沒有接任何 JavaScript**——
     滑到第幾位老師它都停在第一顆，點下去也沒有反應。

   09-23 的紀錄（保留備查）：
   · index.html 從 13,209 行變成 13,362 行。9/22 有六個 commit：
       呂碩、旺哲老師加試聽影片
       首頁下方加聯絡資訊橫幅（FB、LINE、地圖、電話）
       錄取學校加中崙、西松、麗山、大直
       首頁聯絡資訊區縮小
       移除首頁大標題
       SEO：結構化資料網址統一、sitemap 更新日期
   · #4 / #5 / #6 / #A / #C / #D / #E / #F / #G / #H / #I / #J / #K /
     #L / #M / #N 全部複查後確認「仍然存在」，原樣保留，行號重新對過。
   · #F 的過期活動今天（9/23）已經過期 82 天。
   · #G 的守門員名單補上 9/22 新增的兩個彈窗
     （luVideosModal 呂碩、wangzheVideosModal 旺哲）——
     它們用的是同一份 pairs 迴圈，同一個沒有 clearTimeout 的 close()。
   · 新增 #O：手機版 hero 的輪播圓點，整排被底部導覽列蓋住。← 本次最重要
   · 新增 #P：新做的聯絡資訊橫幅，Instagram 那張卡片沒有連結。
   · 新增 #Q：全站有兩個不同的 Facebook 網址。
     （#P / #Q 都需要您提供正確網址，見下方 IG_URL / FB_URL）

   09-21 的紀錄（保留備查）：
   · index.html 仍是 13,209 行，與 9/20 完全相同（最後一個 commit 是
     9/19 的「更新四步驟流程圖（手機版拆成四格）」）。
     #4 / #5 / #6 / #A / #C / #D / #E / #F / #G / #H / #I / #J / #K / #L
     全部複查後確認「仍然存在」，原樣保留，行號重新對過。
   · #F 的過期活動今天（9/21）已經過期 80 天。
   · 新增 #M：師資輪播的圓點，是「藏起來卻還能被 Tab 選到」的按鈕。
   · 新增 #N：行事曆按下「放大」之後要重新下載一份沒快取過的 JPG。
   · 本次另外修了兩個**不在 index.html 裡**的檔案（見報告）：
       .gitignore            bugfix-patch.*  → bugfix-patch*
       _移除已公開的檢查檔.ps1  同一個 pattern
     原本的寫法擋不到 bugfix-patch-tracking.js / bugfix-patch-courses.js。

   09-20 的紀錄（保留備查）：
   · index.html 從 12,989 行變成 13,208 行（9/19 的 commit：
     「行事曆改成年級切換大圖」「行事曆：點圖放大、長按存圖」
     「新增元欣主導師、手機下方列加行事曆」
     「更新四步驟流程圖（手機版拆成四格）」）。
   · #4 / #5 / #6 / #A / #C / #D / #E / #F / #G 全部複查後確認
     「仍然存在」，原樣保留；行號已重新對過（#A 的
     initMobileBottomNav 現在在 12615 行，而 <nav> 在 13176 行，
     成因完全一樣）。
   · #F 的過期活動今天（9/20）已經過期 79 天，仍掛在首頁。
   · 新增 #H：行事曆放大檢視「關閉→立刻再開」會變全黑（比 #G 更嚴重）。
   · 新增 #I：<picture> 的 WebP 退回 JPG 那段，寫了等於沒寫。
   · 新增 #J：四步驟流程圖在手機上，對螢幕閱讀器是完全空白的。
   · 新增 #K：favicon 宣告成 image/png，實際檔案是 JPEG。
   · 新增 #L：行事曆年級列的 tablist 裡混了非 tab 的子元素。
   · 「×」關不掉那一項（#11）是純 CSS，在 bugfix-patch.css。

   09-19 的紀錄（保留備查）：
   · index.html 仍是 12,989 行，與 9/18 完全相同（最後一個 commit 是 9/17）。
     #4 / #5 / #6 / #A / #C / #D / #E / #F 全部複查後確認「仍然存在」，原樣保留。
   · 新增 #G：所有彈窗共用的「關閉→立刻再打開就消失」競態。
     這是這次唯一新增的**功能性**修正，六處彈窗都吃得到。
   · courses.html 的登入密碼被寫進 console 這件事，因為不在 index.html，
     另外開了一個檔：bugfix-patch-courses.js。

   09-18 的紀錄（保留備查）：
   · index.html 已被您更新到 12,989 行（9/17 那三個 commit：
     SEO/noindex、行事曆改 WebP、移除老師課表面板、資料庫加封面橫幅）。
   · #B（首頁故事區影片彈窗是空的）→ **您自己修好了**，本檔已移除該段。
   · #4 / #5 / #6 / #A / #C / #D / #E 複查後確認「仍然存在」，原樣保留。
   · 新增 #F：過期活動（7/3 升八開課）在首頁最新消息與行事曆都還掛著
     「現在開始登記」，今天 9/18，過期兩個半月。

   09-17 的紀錄（保留備查）：
   · #D 理化 DATABASE「3 份講義」點進去一份都打不開。
   · #E 同一個小節 3-2 有「酸與鹼」「酸和鹼」兩種寫法。
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     【要改文案的話，改這裡就好】
     最新消息彈窗目前寫的是 7/3 升八開課，已經過期。
     把下面改成新的消息，首頁的彈窗就會換掉；
     維持 null 的話，程式只會在舊標題後面補一行「已過期」的提示，
     不會擅自幫您編新文案。
     例：
       var NEWS_OVERRIDE = {
         title: '10 月 6 日 國八理化第二次段考衝刺班',
         body:  '兩週密集複習，現在開放登記。'
       };
     ============================================================ */
  var NEWS_OVERRIDE = null;

  /* ============================================================
     【#P】首頁下方「聯絡資訊」橫幅的 Instagram 卡片沒有連結。
     圖上畫了 Facebook / Instagram / 加入官方 LINE 三張卡，
     但 index.html 只放了 Facebook 與 LINE 兩塊可點區域，
     中間那張 Instagram 點下去完全沒反應。
     把補習班的 IG 網址填進來，這個 patch 就會把中間那塊補上去
     （桌機版與手機版兩張圖都會補）。
     例：var IG_URL = 'https://www.instagram.com/ourhope.tw/';
     ============================================================ */
  var IG_URL = '';

  /* ============================================================
     【#Q】全站有兩個不同的 Facebook 網址：
       頁尾（index.html 11741 行）  https://www.facebook.com/ourhopeourhome/
       聯絡橫幅（8865 / 8877 行）   https://www.facebook.com/xi.wang.7127/
     而頁尾目前被 CSS 藏起來（見 #2），所以家長實際點得到的
     只有橫幅那一個。這兩個哪一個才是官方粉專，只有您知道。
     把正確的那一個填進來，patch 會把全站的 facebook 連結統一成它；
     留空 = 不動，只在 console 印出提醒。
     ============================================================ */
  var FB_URL = '';

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
       #B 首頁故事區的影片縮圖點下去，彈窗是空的  ← ✅ 已解決，本段移除

       這個問題的成因是：彈窗右側原本是「課堂實錄」影片框，
       需要 mountLive() 建 iframe，而從首頁進去的路徑沒呼叫它。
       您 9/17 把右側整個改成「理化 DATABASE」清單之後，
       內容改由 wangDatabaseInit() 在頁面載入時就渲染好，
       不再需要開啟時的初始化 → 兩條路徑現在結果一致。
       複查 index.html 12947–12957 行與 10627–10633 行確認無誤，
       這段補丁已經沒有作用，移除。
       -------------------------------------------------------- */

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

    /* --------------------------------------------------------
       #F 首頁最顯眼的兩個地方，都還掛著過期兩個半月的活動  ← 新

       今天是 2026-09-18。但：

       (a) 行事曆第一張卡（index.html 10741–10753 行）
             JUL / 03 / 2026
             「升八年級理化開課」
             「七月正式開班，現在開始登記，預約劃位中。名額有限，先搶先贏。」
             [LINE 立即預約 →]
           而且它帶著 class="calendar-card highlight"，是整頁最亮的那張。

       (b) 首頁 hero 的「最新消息」彈窗（index.html 8604–8605 行）
             <h3 class="news-modal-title">7 月 3 日 升八年級理化開課</h3>
             <p class="news-modal-body">現在開始登記，預約劃位中……</p>
           這個更嚴重——它是 hero 上那顆 NEWS 膠囊點下去的內容，
           是訪客進站後最可能點的第一個東西。
           （前幾份報告只抓到 (a)，(b) 是這次才發現的。）

       家長九月看到「現在開始登記」去點 LINE，得到的是七月的梯次。

       → 程式只能做「誠實」的事，不能幫您編新消息：
         · 行事曆：把已經過去的日期標成 data-past（外觀降級、
           tag 改成「已結束」、CTA 從「立即預約」改成「詢問最新梯次」）。
         · 最新消息：標題後面補一行「此消息已過期」的提示。
         · 想直接換掉文案，把本檔最上面的 NEWS_OVERRIDE 填一填就好。

       （正式版的根治做法：10741–10759 與 8604–8605 直接換成新文案。
         這兩處只有您能決定要寫什麼。）
       -------------------------------------------------------- */
    (function markExpiredNews() {
      var MONTHS = { JAN:0, FEB:1, MAR:2, APR:3, MAY:4, JUN:5,
                     JUL:6, AUG:7, SEP:8, OCT:9, NOV:10, DEC:11 };
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      /* ---- (a) 行事曆卡片 ---- */
      document.querySelectorAll('.calendar-card').forEach(function (card) {
        var mEl = card.querySelector('.calendar-month');
        var dEl = card.querySelector('.calendar-day');
        var yEl = card.querySelector('.calendar-year');
        if (!mEl || !dEl || !yEl) return;

        var mo = MONTHS[(mEl.textContent || '').trim().toUpperCase()];
        var day = parseInt((dEl.textContent || '').trim(), 10);
        var yr = parseInt((yEl.textContent || '').trim(), 10);
        // TBA / 敬請期待 之類的卡片解析不出來，直接跳過（那是「未定」不是「過期」）
        if (mo === undefined || isNaN(day) || isNaN(yr)) return;

        var when = new Date(yr, mo, day);
        if (when >= today) return;

        card.setAttribute('data-past', 'true');
        card.classList.remove('highlight');

        var tag = card.querySelector('.calendar-tag');
        if (tag && tag.textContent.indexOf('已結束') === -1) {
          tag.textContent = 'ENDED · 已結束';
        }
        var link = card.querySelector('.calendar-link');
        if (link && link.textContent.indexOf('最新梯次') === -1) {
          link.textContent = 'LINE 詢問最新梯次 →';
        }
      });

      /* ---- (b) 最新消息彈窗 ---- */
      var title = document.querySelector('.news-modal-title');
      var body = document.querySelector('.news-modal-body');
      if (!title) return;

      if (NEWS_OVERRIDE && NEWS_OVERRIDE.title) {
        title.textContent = NEWS_OVERRIDE.title;
        if (body && NEWS_OVERRIDE.body) body.textContent = NEWS_OVERRIDE.body;
        return;
      }

      // 標題像「7 月 3 日 …」→ 解析出月/日，判斷是否已經過去
      var m = /(\d{1,2})\s*月\s*(\d{1,2})\s*日/.exec(title.textContent || '');
      if (!m) return;

      var when2 = new Date(today.getFullYear(), +m[1] - 1, +m[2]);
      // 標題不寫年份，一律當成今年；離今天超過 14 天才算「過期」，
      // 避免「下週開課」這種還沒到的消息被誤標。
      var daysAgo = Math.floor((today - when2) / 86400000);
      if (daysAgo < 14) return;

      title.setAttribute('data-expired', 'true');
      title.setAttribute('data-expired-note',
        '⚠ 這則消息的日期已經過了 ' + daysAgo + ' 天（' +
        (today.getFullYear()) + '/' + m[1] + '/' + m[2] +
        '）。最新梯次請直接用下方 LINE 詢問。');

      if (body && body.textContent.indexOf('現在開始登記') !== -1) {
        body.textContent = '本梯次已開課。下一梯的時間與名額，請用下方 LINE 或電話詢問。';
      }
    })();

    /* --------------------------------------------------------
       #G 彈窗「關閉之後馬上再打開，會自己消失」  ← 新（09-19）

       全站的彈窗關閉都是同一個寫法：先把 is-open 拿掉讓它淡出，
       再用 setTimeout 等動畫跑完才真的 hidden = true。
       例（index.html 8714–8718 行，最新消息）：

         function close(){
           modal.classList.remove('is-open');
           setTimeout(function(){ modal.hidden = true; }, 250);
           document.body.style.overflow = '';
         }

       問題是**那個 timer 沒有人取消**。
       使用者按了「×」之後，在動畫跑完前（0.25～0.32 秒內）又點了
       同一顆按鈕重新打開 —— open() 先把 hidden 設回 false、加上 is-open，
       接著那個還在排隊的舊 timer 才燒到，又把 hidden 設成 true。
       畫面上就是：點了、閃一下、不見了，要再點第三次才會出來。

       同一個寫法在六個地方出現（行號 09-21 重新對過）：

         8716  最新消息 newsModal              只有 hidden
         9808  線上課程購物車（已停用的區塊）   只有 hidden
        10743  四位老師的影片彈窗              hidden ＋ unmountLive()
                 （wangVideosModal / fangVideosModal /
                   lianVideosModal / houVideosModal）
        12513  會考英雄榜 championLightbox     只有 hidden
        13066  家長選擇我們的理由 bentoModal   hidden ＋ body.innerHTML = ''
        13128  獎學金放大 scholarshipZoom      hidden ＋ zoomImg.src = ''

       最後兩個比較嚴重：舊 timer 不只會把彈窗藏起來，還會把剛剛才
       填好的內容清空 —— 所以就算硬把它顯示回來，也是一張白卡片。

       0.25 秒聽起來很短，但「關錯了、馬上再點一次」正是最常見的操作，
       手機上連點兩下更容易踩到。

       → 這裡用 MutationObserver 監看所有彈窗的 hidden 屬性：
         只要偵測到「還掛著 is-open，卻被設成 hidden」這個不可能的狀態，
         就把它擋回去；bentoModal 與 scholarshipZoom 另外把被清掉的
         內容補回來（開啟時先記下來）。

       （正式版的根治做法：把 timer 存起來，open() 裡先 clearTimeout。
         六處都一樣，例如最新消息那一段改成：

           var closeTimer = null;
           function open(){
             clearTimeout(closeTimer);        // ← 加這一行
             modal.hidden = false;
             ...
           }
           function close(){
             modal.classList.remove('is-open');
             closeTimer = setTimeout(function(){ modal.hidden = true; }, 250);
             ...
           }
       ）
       -------------------------------------------------------- */
    (function fixModalReopenRace() {
      if (!window.MutationObserver) return;

      /* ---- 先記住「內容會被舊 timer 清掉」的那兩個彈窗開啟時的狀態 ---- */
      var lastBentoHTML = '';
      var lastZoomSrc   = '';

      // 家長選擇我們的理由：點卡片時，正式版會把卡片內容組進彈窗；
      // 這裡在同一個時機把組好的結果抄一份起來。
      document.querySelectorAll('.bento-card[data-bento]').forEach(function (card) {
        card.addEventListener('click', function () {
          // 等正式版的 handler 先跑完再抄
          setTimeout(function () {
            var body = document.getElementById('bentoModalBody');
            if (body && body.innerHTML.trim()) lastBentoHTML = body.innerHTML;
          }, 0);
        });
      });

      var zoomImg = document.getElementById('scholarshipZoomImg');
      if (zoomImg && window.MutationObserver) {
        new MutationObserver(function () {
          var s = zoomImg.getAttribute('src') || '';
          if (s) lastZoomSrc = s;          // 只記有東西的時候，被清空不覆寫
        }).observe(zoomImg, { attributes: true, attributeFilter: ['src'] });
      }

      /* ---- 主要守門員 ---- */
      function guard(el) {
        if (!el || el.__reopenGuarded) return;
        el.__reopenGuarded = true;

        new MutationObserver(function () {
          // 「還在開著（is-open）卻被藏起來」＝ 一定是舊 timer 燒過頭了
          if (!el.hidden || !el.classList.contains('is-open')) return;

          el.hidden = false;

          if (el.id === 'bentoModal') {
            var body = document.getElementById('bentoModalBody');
            if (body && !body.innerHTML.trim() && lastBentoHTML) {
              body.innerHTML = lastBentoHTML;
            }
          }
          if (el.id === 'scholarshipZoom') {
            var img = document.getElementById('scholarshipZoomImg');
            if (img && !img.getAttribute('src') && lastZoomSrc) {
              img.setAttribute('src', lastZoomSrc);
            }
          }
          // 彈窗還開著，捲動鎖不該被前一次的 close() 解掉
          document.body.style.overflow = 'hidden';
        }).observe(el, { attributes: true, attributeFilter: ['hidden'] });
      }

      [
        'newsModal', 'championLightbox', 'bentoModal', 'scholarshipZoom',
        'wangVideosModal', 'fangVideosModal', 'lianVideosModal', 'houVideosModal',
        // 09-22 新增的兩位老師，共用同一個 pairs 迴圈、同一個沒有
        // clearTimeout 的 close()，所以一樣會中這個競態（09-23 補上）
        'luVideosModal', 'wangzheVideosModal'
      ].forEach(function (id) { guard(document.getElementById(id)); });
      // 保險：以後再加老師也自動納入
      document.querySelectorAll('.video-modal[id]').forEach(guard);

      // 線上課程的購物車彈窗（目前入口已停用，一併保護以免日後開回來）
      document.querySelectorAll('.shop-modal').forEach(guard);
    })();

    /* --------------------------------------------------------
       #H 行事曆放大檢視「關閉→立刻再開」會變成全黑  ← 新（09-20）

       跟 #G 同一個病，但這次多清了一樣東西，所以更嚴重。
       index.html 12749–12754 行：

         function closeViewer() {
           viewer.classList.remove('is-open');
           document.documentElement.classList.remove('cal-viewer-lock');
           setTimeout(function () {
             viewer.hidden = true;
             vImg.removeAttribute('src');     ← 連圖片一起拔掉
           }, 250);
           if (lastFocus) lastFocus.focus({ preventScroll: true });
         }

       這個 timer 一樣沒有人 clearTimeout。家長常見的操作是：
       放大國七行事曆 → 看完按「×」→ 馬上點國八那張放大。
       兩個動作之間如果不到 0.25 秒（手機上點兩下很容易），
       舊 timer 才燒到，就會：
         · viewer.hidden = true        → 整個蓋板不見
         · vImg.removeAttribute('src') → 圖片來源被拔掉

       第二點是 #G 沒有的：就算硬把它顯示回來，也是一片全黑
       （.cal-viewer 底色是 rgba(12,10,24,0.92)）中間一個破圖框。
       要再點第三次才會正常。

       另外 .cal-viewer 是 12719 行用 JS 臨時 createElement 出來的，
       第一次點圖片才會生出來，而且沒有 id，
       所以 #G 那份用 id 抓的守門員名單抓不到它，必須另外處理。

       → 這裡監看 <body> 的子節點，等 .cal-viewer 一出現就：
         · 記住每次成功載入的圖片網址；
         · 偵測到「還掛著 is-open 卻被設成 hidden」或
           「還開著卻沒有 src」就補回去。

       （正式版的根治做法：跟 #G 一樣，把 timer 存起來，
         openViewer() 的第一行加 clearTimeout(closeTimer);）
       -------------------------------------------------------- */
    (function fixCalViewerReopenRace() {
      if (!window.MutationObserver) return;

      var lastSrc = '';

      function guardViewer(el) {
        if (!el || el.__calGuarded) return;
        el.__calGuarded = true;

        var img = el.querySelector('img');

        // 記住有內容的那一次（被清空時不要覆寫掉備份）
        if (img) {
          new MutationObserver(function () {
            var s = img.getAttribute('src') || '';
            if (s) lastSrc = s;
          }).observe(img, { attributes: true, attributeFilter: ['src'] });
        }

        function rescue() {
          if (!el.classList.contains('is-open')) return;
          if (el.hidden) el.hidden = false;
          if (img && !img.getAttribute('src') && lastSrc) {
            img.setAttribute('src', lastSrc);
          }
          // 還開著，捲動鎖不該被前一次的 closeViewer() 解掉
          document.documentElement.classList.add('cal-viewer-lock');
        }

        new MutationObserver(rescue)
          .observe(el, { attributes: true, attributeFilter: ['hidden', 'class'] });
        if (img) {
          new MutationObserver(rescue)
            .observe(img, { attributes: true, attributeFilter: ['src'] });
        }
      }

      // 已經在的話先接手；還沒生出來就等它出現
      guardViewer(document.querySelector('.cal-viewer'));
      new MutationObserver(function (list) {
        list.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (n) {
            if (n.nodeType === 1 && n.classList && n.classList.contains('cal-viewer')) {
              guardViewer(n);
            }
          });
        });
      }).observe(document.body, { childList: true });
    })();

    /* --------------------------------------------------------
       #I 行事曆的「WebP 萬一沒上傳成功就退回 JPG」寫了等於沒寫  ← 新

       index.html 12762–12768 行：

         document.querySelectorAll('.calendar-board picture img').forEach(function (img) {
           img.addEventListener('error', function () {
             var src = img.parentNode.querySelector('source');
             if (src) { src.parentNode.removeChild(src); img.src = img.getAttribute('src'); }
           }, { once: true });
         });

       最後那一句 `img.src = img.getAttribute('src')` 是把
       **同一個字串再指派一次**（本來就是 "115國七行事曆.jpg"）。
       屬性值沒有變，瀏覽器不保證會重跑 <picture> 的來源挑選，
       實務上多半什麼事都不會發生 —— <source> 是移掉了，
       但圖片仍然停在失敗的狀態，家長看到的還是破圖框。

       目前五個 .webp 都在資料夾裡，所以「現在看起來正常」，
       這是一個**下次漏傳 WebP 才會爆**的地雷。

       → 這裡改成先清空再指派，強迫瀏覽器重新挑一次來源。
         （正式版的根治做法：12766 行改成
            var jpg = img.getAttribute('src');
            src.parentNode.removeChild(src);
            img.removeAttribute('src');
            img.src = jpg;
          並且不要用 { once: true }，改成自己擋重入，
          否則 JPG 也失敗時就沒有第二次機會了。）
       -------------------------------------------------------- */
    (function fixPictureWebpFallback() {
      document.querySelectorAll('picture > img').forEach(function (img) {
        if (img.__webpFallbackFixed) return;
        img.__webpFallbackFixed = true;

        img.addEventListener('error', function () {
          if (img.__fellBack) return;       // JPG 也壞掉就不再繞圈
          var source = img.parentNode && img.parentNode.querySelector('source');
          var jpg = img.getAttribute('src');
          if (!source || !jpg) return;
          img.__fellBack = true;
          source.parentNode.removeChild(source);
          img.removeAttribute('src');       // ← 關鍵：先清空
          img.setAttribute('src', jpg);     //   再指派，來源挑選才會重跑
        });
      });
    })();

    /* --------------------------------------------------------
       #J 四步驟流程圖：手機版對螢幕閱讀器是完全空白的  ← 新

       index.html 9078–9086 行（9/19 新做的）：

         <img class="process-image-full" src="四步驟流程.webp"
              alt="四步驟：01 免費試聽、02 完成報名、03 上課、04 輔導" ... />
         <ol class="process-image-steps" aria-hidden="true">
           <li><img src="流程-1.webp" alt="" ... /></li>
           ...

       而 CSS 4279–4291 行：
         .process-image-steps { display: none; }
         @media (max-width: 680px) {
           .process-image-full { display: none; }    ← 手機把有 alt 的藏起來
           .process-image-steps { display: grid; }   ← 顯示 aria-hidden 的那組
         }

       也就是說，手機上：
         · 唯一寫了 alt 的那張被 display:none（讀不到）；
         · 顯示出來的四張，容器是 aria-hidden="true"、
           圖片又全是 alt=""。

       結果整個「四步驟，為孩子打好基礎」區塊，在手機上對
       螢幕閱讀器、以及圖片載入失敗時的替代文字，都是一片空白。
       Google 的圖片索引也抓不到這四張的內容。

       → 這裡在手機寬度下，把四張圖補上各自的 alt，
         並把容器的 aria-hidden 拿掉。
         （正式版的根治做法：9081 行拿掉 aria-hidden="true"，
           9082–9085 四行各自補上 alt。）
       -------------------------------------------------------- */
    (function fixProcessStepsAlt() {
      var ol = document.querySelector('.process-image-steps');
      if (!ol) return;

      var ALTS = [
        '步驟 01 · 免費試聽',
        '步驟 02 · 完成報名',
        '步驟 03 · 上課',
        '步驟 04 · 課後輔導'
      ];

      ol.removeAttribute('aria-hidden');
      ol.setAttribute('aria-label', '四步驟教學流程');
      ol.querySelectorAll('img').forEach(function (img, i) {
        if (!img.getAttribute('alt')) img.setAttribute('alt', ALTS[i] || '');
      });
    })();

    /* --------------------------------------------------------
       #K favicon 宣告的格式跟實際檔案不符  ← 新

       index.html 32 行：
         <link rel="icon" type="image/png" href="navbar-logo.jpg" />

       type 寫 image/png，但 href 指到的是 JPEG。
       瀏覽器多半會忽略 type 自己判斷，所以「現在看起來正常」，
       但這是 HTML 驗證會報的錯，嚴格一點的爬蟲／分享預覽
       （LINE、Facebook 的 favicon 抓取）可能直接跳過。

       → 這裡把 type 改成 image/jpeg。
         （正式版的根治做法：32 行改成 type="image/jpeg"，
           或乾脆做一張真正的 favicon.png / .ico。）
       -------------------------------------------------------- */
    (function fixFaviconType() {
      document.querySelectorAll('link[rel~="icon"]').forEach(function (l) {
        var href = (l.getAttribute('href') || '').toLowerCase();
        var type = l.getAttribute('type') || '';
        if (/\.jpe?g($|\?)/.test(href) && type !== 'image/jpeg') {
          l.setAttribute('type', 'image/jpeg');
        }
      });
    })();

    /* --------------------------------------------------------
       #L 行事曆年級列的 tablist 裡混了非 tab 的子元素  ← 新

       index.html 10773–10782 行：

         <div class="cal-tabs" role="tablist" aria-label="選擇年級">
           <span class="cal-tabs-group">國中部</span>        ← 不是 tab
           <button role="tab" ...>國七</button>
           <button role="tab" ...>國八</button>
           <button role="tab" ...>國九</button>
           <span class="cal-tabs-sep" aria-hidden="true"></span>
           <span class="cal-tabs-group">高中部</span>        ← 不是 tab
           <button role="tab" ...>高一</button>
           <button role="tab" ...>高二</button>
         </div>

       依 ARIA 規範，role="tablist" 底下只能放 role="tab"。
       多出來的兩個 <span> 會讓輔助技術把整組的計數弄錯
       （「第 1 個，共 7 個」之類），而且它們讀出來的
       「國中部」「高中部」跟後面的按鈕沒有任何關聯。
       手機上這兩個 span 又被 display:none 藏起來（見 CSS #12），
       等於視覺和語意兩邊都斷了。

       → 這裡把兩個分組標籤設成 aria-hidden="true"（視覺留著、
         不進無障礙樹；<span> 本身沒有 role，光加 role="presentation"
         擋不住裡面的文字被讀出來），
         改把分組資訊直接併進每顆按鈕的 aria-label：
         「國中部 國七」「高中部 高一」。
         視覺完全不變。
         （正式版的根治做法：把 role="tablist" 往內收，
           或改用兩個 tablist（國中部一組、高中部一組）。）
       -------------------------------------------------------- */
    (function fixCalTablistAria() {
      var list = document.querySelector('.cal-tabs[role="tablist"]');
      if (!list) return;

      var group = '';
      Array.prototype.forEach.call(list.children, function (el) {
        if (el.classList.contains('cal-tabs-group')) {
          group = (el.textContent || '').trim();
          el.setAttribute('aria-hidden', 'true');
          return;
        }
        if (el.getAttribute('role') === 'tab' && group) {
          if (!el.getAttribute('aria-label')) {
            el.setAttribute('aria-label', group + ' ' + (el.textContent || '').trim());
          }
        }
      });
    })();

    /* --------------------------------------------------------
       #M 師資輪播的圓點：藏起來了，卻還能被 Tab 選到  ← 新（09-21）

       index.html 10172–10180 行：

         <div class="teachers-dots" id="teachersDots" aria-hidden="true">
           <button class="dot active" data-idx="0" aria-label="第 1 位老師"></button>
           ... 共八顆 ...
         </div>

       容器掛了 aria-hidden="true"（＝「這一塊不要讀給輔助技術聽」），
       但裡面八顆是貨真價實的 <button>，沒有 tabindex="-1"，
       所以鍵盤仍然 Tab 得到。這是 ARIA 明文禁止的組合
       （aria-hidden 的子樹裡不能有可聚焦元素）。

       實際會發生的事：用鍵盤瀏覽的人在師資區按 Tab，
       會連續八次停在「什麼都不會念出來、螢幕上也看不出被選中」
       的地方（.dot 沒有 :focus-visible 樣式），
       像是游標憑空消失八下。每顆還寫了 aria-label="第 N 位老師"，
       但被 aria-hidden 蓋掉，等於白寫。

       這兩年的自動檢測工具（axe / Lighthouse 無障礙分數）
       會把 aria-hidden-focus 列為 serious 等級。

       → 這裡給八顆圓點補上 tabindex="-1"。
         滑鼠與觸控完全不受影響（照樣點得動、照樣切老師），
         只是不再攔截鍵盤焦點。視覺零變化。

       （正式版的根治做法：10173–10180 每顆 <button> 補 tabindex="-1"；
         或者反過來——拿掉容器的 aria-hidden，把圓點當成真正的
         分頁控制項，並補上 :focus-visible 的外框。
         後者比較完整，但要多寫 CSS，看您想做到哪個程度。）
       -------------------------------------------------------- */
    (function fixHiddenFocusableDots() {
      // 全站掃一次。今天實際掃得到的只有 #teachersDots 這一處
      // （其他 aria-hidden 的容器裡都只有 <svg> 圖示，不可聚焦），
      // 寫成通用的是為了以後再加輪播時不用改這裡。
      document.querySelectorAll('[aria-hidden="true"]').forEach(function (box) {
        box.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ).forEach(function (el) {
          el.setAttribute('tabindex', '-1');
        });
      });
    })();

    /* --------------------------------------------------------
       #N 行事曆按「放大」之後，要重新下載一份沒快取過的 JPG  ← 新（09-21）

       這不是壞掉，是一個「兩段設計沒對上」的效能問題。

       (1) 頁面上顯示的行事曆是 WebP（index.html 10794 行）：
             <picture>
               <source srcset="115國七行事曆.webp" type="image/webp" />
               <img src="115國七行事曆.jpg" ... />
             </picture>
           支援 WebP 的瀏覽器（現在幾乎全部）抓的是 .webp。

       (2) 背景預載（11664–11670 行的 srcOf()）很聰明地也只抓 .webp：
             if (canWebp && 父層是 <picture>) return source 的 srcset;
           所以快取裡有 .webp，沒有 .jpg。

       (3) 但放大檢視（12741 行）刻意改抓 JPG：
             vImg.src = frame.getAttribute('data-full') || ...
             // data-full="115國七行事曆.jpg"
           程式碼裡的註解寫得很清楚，這是故意的：
           「顯示 JPG，家長長按存下來的就是 JPG，傳 LINE 最不會出問題」。

       這個取捨本身是對的（LINE 對 WebP 的支援確實不穩），
       問題在於 **(2) 和 (3) 抓的是不同檔案**：
       家長點下去的那一刻，瀏覽器才開始下載一份從來沒抓過的 JPG，
       而 JPG 又是沒壓過的原圖。在補習班門口用 4G 的手機上，
       就是「點了放大 → 先看到一片黑 → 等圖」。

       → 這裡在瀏覽器閒下來的時候，把**目前顯示中**那一張的
         data-full（JPG）悄悄預抓進快取，並且：
           · 只抓現在看得到的那一張，不是五張全抓；
           · 切年級時再抓新的那一張；
           · 開了「節省流量」或 2G/3G 就完全不做。
         點下去就會是秒開，而且長按存到的仍然是 JPG。

       （正式版的根治做法，二選一：
          (a) 照這裡的做法，在 calendarSwitch() 的 show() 最後
              加一行把 data-full 預抓起來；
          (b) 或者放大檢視改成顯示 WebP（跟頁面一致、不用多下載），
              另外在提示文字旁邊放一顆
              <a href="…jpg" download> 下載 JPG </a>。
          (b) 省流量，(a) 順手。我偏好 (a)，因為「長按存圖」
          是家長真的會做的動作，不該多一個步驟。）
       -------------------------------------------------------- */
    (function prefetchCalendarFullJpg() {
      var boards = document.querySelectorAll('.calendar-board[data-cal]');
      if (!boards.length) return;

      var conn = navigator.connection || navigator.mozConnection ||
                 navigator.webkitConnection || {};
      if (conn.saveData) return;                                  // 節省流量 → 不做
      if (/(^|-)[23]g$/.test(conn.effectiveType || '')) return;   // 2G/3G → 不做

      var done = {};
      // 注意：requestIdleCallback 一定要用 window 當 this 呼叫，
      // 直接拿參考出來呼叫在 Chrome 會丟 "Illegal invocation"。
      var idle = window.requestIdleCallback
        ? function (fn) { return window.requestIdleCallback(fn, { timeout: 4000 }); }
        : function (fn) { return setTimeout(fn, 1200); };

      function warmCurrent() {
        var on = document.querySelector('.calendar-board.is-on .calendar-board-frame');
        if (!on) return;
        var url = on.getAttribute('data-full');
        if (!url || done[url]) return;
        done[url] = 1;
        idle(function () {
          var im = new Image();
          if ('fetchPriority' in im) im.fetchPriority = 'low';
          im.decoding = 'async';
          im.src = url;
        });
      }

      warmCurrent();
      // 切年級 → 換成預抓新的那一張（正式版切完才加 is-on，所以等它一下）
      document.querySelectorAll('.cal-tab').forEach(function (t) {
        t.addEventListener('click', function () { setTimeout(warmCurrent, 0); });
      });
    })();

    /* --------------------------------------------------------
       #O 手機版：hero 的輪播圓點整排被底部導覽列蓋住  ← 新（09-23）

       index.html 418–426 行：
         .hero-dots {
           position: absolute;
           bottom: 18px;            ← 距離 hero 底部 18px
           left: 50%; transform: translateX(-50%);
           z-index: 5;
         }

       而手機底部導覽列（8184–8199 行）：
         .mobile-bottom-nav {
           position: fixed;
           bottom: 14px; left: 12px; right: 12px;
           padding: 8px 10px;       ← 連圖示＋文字，整條高約 56px
           z-index: 9999;
           background: rgba(28,28,32,0.95);   ← 幾乎不透明
         }

       也就是說，在 ≤720px 的螢幕上，導覽列從畫面底部 14px 一路
       蓋到大約 70px，而圓點在 18px —— 整排四顆圓點完全落在
       導覽列底下，而且導覽列的 z-index 是 9999、圓點只有 5。

       結果：
         · 家長在手機上看不到「現在是第幾張、總共幾張」；
         · 想點某一顆直接跳圖也點不到（點下去只會按到導覽列）；
         · hero 是 min-height:100vh，所以這排圓點不是「捲一下就看得到」，
           它是被永久蓋住的。

       桌機沒有底部導覽列（.mobile-bottom-nav 在 >720px 是 display:none），
       所以這個問題只發生在手機——也就是最多人用的裝置。

       這一段不用 JS 就能修，整個修正寫在 bugfix-patch.css 的 #13
       （把圓點在手機上往上移到導覽列上方）。
       這裡只做一件 JS 才做得到的事：圓點目前沒有任何 aria 標記，
       補上 tablist 語意，讓它至少對螢幕閱讀器有意義。

       （正式版的根治做法：在 8183 行那個 @media (max-width:720px) 裡
         加一條 .hero-dots { bottom: 84px; }）
       -------------------------------------------------------- */
    (function fixHeroDotsSemantics() {
      var box = document.getElementById('heroDots');
      if (!box) return;
      var dots = box.querySelectorAll('.hero-dot');
      if (!dots.length) return;

      box.setAttribute('role', 'tablist');
      box.setAttribute('aria-label', '首頁背景輪播');
      dots.forEach(function (d) {
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-selected', d.classList.contains('is-active') ? 'true' : 'false');
      });
      if (window.MutationObserver) {
        dots.forEach(function (d) {
          new MutationObserver(function () {
            d.setAttribute('aria-selected',
              d.classList.contains('is-active') ? 'true' : 'false');
          }).observe(d, { attributes: true, attributeFilter: ['class'] });
        });
      }
    })();

    /* --------------------------------------------------------
       #P 聯絡資訊橫幅：Instagram 那張卡片點不動  ← 新（09-23）

       9/22 新做的「首頁下方聯絡資訊」是一張整圖，上面疊透明的
       <a class="hc-hot"> 當可點區域（index.html 8856–8883 行）。

       圖上畫了三張卡：Facebook、Instagram、加入官方 LINE，
       alt 也老實寫了「Facebook、Instagram、加入官方 LINE」。
       但實際只放了兩塊可點區域：

         桌機版（8865/8866 行）
           Facebook  left:42.30%  width:16.20%   → 42.30%～58.50%
           LINE      left:77.25%  width:16.20%   → 77.25%～93.45%
           中間 58.50%～77.25% 這塊（＝ Instagram）沒有任何連結

         手機版（8877/8878 行）
           Facebook  left:1.52%   width:30.71%
           LINE      left:67.77%  width:30.71%
           中間 34%～66% 這塊（＝ Instagram）一樣沒有連結

       量過原圖（聯絡資訊.webp 2172×724、聯絡資訊-右.webp 1146×413）
       確認三張卡的位置與上面的百分比對得起來，中間那張確實是
       Instagram，而且確實是空的。

       家長看到三張一模一樣的卡，點中間那張什麼事都不會發生 ——
       比「沒有這張卡」更糟，因為看起來像網站壞了。

       → 把 IG 網址填進本檔最上面的 IG_URL，這裡就會把兩張圖
         中間那塊補上去（位置用左右兩塊算出來，保證對齊）。
         留空的話只在 console 提醒，不會亂猜網址。

       （正式版的根治做法：在 8865 與 8877 行中間各插一行
         <a class="hc-hot is-card" href="您的IG網址" target="_blank"
            rel="noopener" aria-label="希望補習班 Instagram"
            style="left:59.78%;top:22.04%;width:16.20%;height:53.22%"></a>
         手機版那張用 style="left:34.64%;top:3.16%;width:30.71%;height:93.42%"）
       -------------------------------------------------------- */
    (function fixContactBannerInstagram() {
      var banner = document.querySelector('.hc-banner');
      if (!banner) return;

      // 每一塊圖（桌機一張、手機兩張）各自處理
      var blocks = banner.querySelectorAll('.hc-full, .hc-part');
      var patched = 0, found = 0;

      blocks.forEach(function (block) {
        var cards = block.querySelectorAll('a.hc-hot.is-card');
        if (cards.length !== 2) return;          // 不是「FB + LINE」這種版型就跳過

        // 已經補過就不要補第二次
        if (block.querySelector('a.hc-hot[data-bugfix-ig]')) return;

        function num(el, prop) { return parseFloat(el.style[prop]) || 0; };

        var a = cards[0], b = cards[1];
        var left = num(a, 'left'), w = num(a, 'width');
        var right = num(b, 'left');
        // 三張卡等寬等距 → 中間那張的左緣 = 兩張卡左緣的中點
        var midLeft = (left + right) / 2;
        if (!(w > 0) || !(right > left)) return;

        found++;
        if (!IG_URL) return;

        var ig = document.createElement('a');
        ig.className = a.className;
        ig.setAttribute('data-bugfix-ig', '1');
        ig.href = IG_URL;
        ig.target = '_blank';
        ig.rel = 'noopener';
        ig.setAttribute('aria-label', '希望補習班 Instagram');
        ig.style.left = midLeft.toFixed(2) + '%';
        ig.style.top = a.style.top;
        ig.style.width = w.toFixed(2) + '%';
        ig.style.height = a.style.height;
        a.parentNode.insertBefore(ig, b);
        patched++;
      });

      if (found && !patched && window.console) {
        console.warn('[bugfix #P] 聯絡資訊橫幅的 Instagram 卡片沒有連結（共 ' +
          found + ' 處）。請把 IG 網址填進 bugfix-patch.js 最上面的 IG_URL。');
      }
    })();

    /* --------------------------------------------------------
       #Q 全站有兩個不同的 Facebook 網址  ← 新（09-23）

       index.html 11741 行（頁尾）：
         <a href="https://www.facebook.com/ourhopeourhome/">FB</a>
       index.html 8865 / 8877 行（9/22 新做的聯絡資訊橫幅）：
         <a href="https://www.facebook.com/xi.wang.7127/" ...>

       同一個網站、同一個「Facebook」按鈕，指到兩個不同的地方。
       而且因為頁尾目前被 `body.is-paged footer { display:none }`
       整個藏起來（見 bugfix-patch.css 的 #2），家長實際上
       只點得到橫幅那一個 —— 也就是 xi.wang.7127。

       ourhopeourhome 看起來像粉絲專頁的網址，
       xi.wang.7127 看起來像個人帳號的網址，
       但這只是從字面猜的，哪一個才是要給家長看的，只有您知道。

       → 把正確的填進本檔最上面的 FB_URL，這裡會把全站統一過去；
         留空就只在 console 印出目前找到哪幾個，不動任何連結。

       （正式版的根治做法：三處（8865 / 8877 / 11741）改成同一個網址。）
       -------------------------------------------------------- */
    (function fixFacebookUrlMismatch() {
      var links = document.querySelectorAll('a[href*="facebook.com"]');
      if (!links.length) return;

      var seen = {};
      links.forEach(function (a) { seen[a.getAttribute('href')] = 1; });
      var urls = Object.keys(seen);

      if (FB_URL) {
        links.forEach(function (a) { a.setAttribute('href', FB_URL); });
        return;
      }
      if (urls.length > 1 && window.console) {
        console.warn('[bugfix #Q] 全站有 ' + urls.length +
          ' 個不同的 Facebook 網址：\n  ' + urls.join('\n  ') +
          '\n請把正確的那一個填進 bugfix-patch.js 最上面的 FB_URL。');
      }
    })();

    /* --------------------------------------------------------
       #R 整個首頁沒有任何 <h1>  ← 新（09-24）· 本次最重要

       9/22 的 commit「移除首頁大標題」把 hero 裡的
       <h1 class="hero-title"> 整段刪掉了。現在 hero 裡只剩下：

         <button class="news-pill">…NEWS 最新消息…</button>
         <div class="hero-buttons"> 立即預約試聽 / 查看聯絡簿 </div>

       我把 index.html 全部 13,362 行掃過，「<h1」出現 0 次。
       也就是說整個網站（首頁就是全站唯一的內容頁）**一個 h1 都沒有**，
       最上層的標題直接從 <h2>關於我們</h2> 開始。

       為什麼這件事要緊：

       · Google 拿 h1 當「這一頁在講什麼」最主要的依據之一。
         現在能表達主題的只剩 <title> 和一堆 h2。
         偏偏同一天（9/22）還有另外兩個 commit 在做 SEO
         （結構化資料統一網址、sitemap 更新日期），
         顯然是想把搜尋排名做起來，卻同時把 h1 弄掉了 ——
         這兩件事是互相抵銷的，所以我判斷它是誤刪，不是設計決定。
       · 補習班很吃「小巨蛋 補習班」「松山 理化」這種在地搜尋，
         h1 是這類關鍵字最該出現的位置。
       · 螢幕閱讀器的使用者習慣按「跳到 h1」來確認自己在哪一頁，
         現在會直接跳到「關於我們」。
       · 標題層級從 h2 開始（跳過 h1）也是 HTML 驗證與
         Lighthouse 無障礙檢查會報的項目。

       → 這裡補一個「看不見但讀得到」的 h1 放在 hero 最前面
         （視覺上完全沒有變化，不會把您刻意留白的封面弄亂）。
         文案取自 <title> 與 og:description 已經在用的字，
         沒有自己編新的東西：
           希望文理補習班 · 汪飛白理化 — 台北松山小巨蛋 30 年國高中文理補習班

       （正式版的根治做法，二選一：
          (a) 想維持現在乾淨的封面 → 照這裡的做法，
              在 8689 行 <div class="hero-inner"> 後面加一行
              視覺隱藏的 <h1>，CSS 用 bugfix-patch.css 的 .sr-only；
          (b) 想把大標題放回來 → 把 9/22 刪掉的 <h1 class="hero-title">
              加回去就好，`.hero-title` 的 CSS（7719 / 8170 行）
              到現在都還留著，是現成可用的死碼。
          我建議 (a)：您 9/22 連著兩個 commit 在縮小首頁的視覺重量
          （移除大標題、聯絡資訊區縮小），看得出是刻意要留白，
          (a) 可以同時保留留白跟 SEO。）
       -------------------------------------------------------- */
    (function fixMissingH1() {
      if (document.querySelector('h1')) return;   // 正式版補好了就不要重複加

      var H1_TEXT = '希望文理補習班 · 汪飛白理化 — 台北松山小巨蛋 30 年國高中文理補習班';

      var host = document.querySelector('.hero .hero-inner') ||
                 document.querySelector('.hero .container') ||
                 document.querySelector('.hero');
      if (!host) return;

      var h1 = document.createElement('h1');
      h1.className = 'sr-only bugfix-h1';
      h1.textContent = H1_TEXT;
      host.insertBefore(h1, host.firstChild);
    })();

    /* --------------------------------------------------------
       #S 師資輪播的八顆圓點，完全沒有接任何 JavaScript  ← 新（09-24）

       手機版（≤520px）的師資區是一個真的輪播
       （index.html 7778–7806 行）：

         .teachers-grid {
           display: flex !important;
           overflow-x: auto;
           scroll-snap-type: x mandatory;
         }
         .teacher-card {
           flex: 0 0 calc(100% - 32px);
           scroll-snap-align: center;
         }

       一頁一位老師，左右滑動，共八位。下面還放了八顆圓點
       （10245–10253 行），第一顆寫著 class="dot active"：

         <div class="teachers-dots" id="teachersDots" aria-hidden="true">
           <button class="dot active" data-idx="0" aria-label="第 1 位老師"></button>
           … 共八顆 …
         </div>

       問題是：**沒有任何 JavaScript 用到它們。**
       我把 13,362 行全部搜過，`teachersDots` 只出現在 10245 行
       這一個地方（就是上面那段 HTML 自己），
       JS 裡一次都沒有被抓出來過；`data-idx` 在 JS 裡只有 12726 行，
       那是 hero 背景輪播自己產生的圓點，跟師資無關。

       所以實際上會發生的事（只在手機，也就是最多人用的裝置）：
         · 家長滑到第五位老師，圓點還是**停在第一顆**——
           永遠告訴你「你在第 1 位」，是錯的資訊；
         · 那八顆是貨真價實的 <button>，看起來像可以點
           （CSS 7835 行還特別寫了 cursor: pointer），
           點下去卻完全沒反應；
         · 因為沒有任何回饋，家長很可能根本不知道右邊還有五位老師
           ——「← 滑動查看更多老師 →」那行提示字（10255 行）
           在 ≤520px 才顯示，而且很小。

       對照組：hero 的背景輪播圓點是 12715–12729 行用 JS 自動產生、
       自動同步、可以點的。師資這組是手寫八顆靜態 HTML，
       八成是當初先把樣子做出來、之後忘了補程式。
       （順帶一提，寫死八顆也表示以後再加第九位老師，
         圓點數量會跟卡片對不上。）

       → 這裡把它補完整：
         · 依「實際有幾張卡」重建圓點（多的刪掉、少的補上），
           順手解決寫死八顆的問題；
         · 捲動時用 scrollLeft 算出目前是第幾張，同步 active
           （rAF 節流，不會拖慢捲動）；
         · 點圓點會平滑捲到那位老師；
         · 圓點本身仍然維持 tabindex="-1"（見 #M，容器是
           aria-hidden），改用 aria-live 之外的方式不動語意，
           視覺行為與桌機完全不受影響（>520px 整組是 display:none）。

       （正式版的根治做法：在 index.html 加一段像下面這樣的
         initTeachersDots()，放在 </body> 前或包進 DOMContentLoaded：

           var grid = document.getElementById('teachersGrid');
           var box  = document.getElementById('teachersDots');
           var cards = grid.querySelectorAll('.teacher-card');
           // 依 cards.length 產生圓點、捲動時同步 active、點擊時 scrollTo
       ）
       -------------------------------------------------------- */
    (function fixTeachersDots() {
      var grid = document.getElementById('teachersGrid');
      var box  = document.getElementById('teachersDots');
      if (!grid || !box) return;

      var cards = grid.querySelectorAll('.teacher-card');
      if (!cards.length) return;

      /* ---- 1. 讓圓點數量等於卡片數量（原本寫死八顆） ---- */
      var dots = box.querySelectorAll('.dot');
      while (dots.length > cards.length) {
        box.removeChild(box.lastElementChild);
        dots = box.querySelectorAll('.dot');
      }
      while (dots.length < cards.length) {
        var add = document.createElement('button');
        add.type = 'button';
        add.className = 'dot';
        box.appendChild(add);
        dots = box.querySelectorAll('.dot');
      }
      dots.forEach(function (d, i) {
        d.setAttribute('data-idx', i);
        d.setAttribute('aria-label', '第 ' + (i + 1) + ' 位老師');
        // 容器是 aria-hidden="true"，不要攔鍵盤焦點（見 #M）
        d.setAttribute('tabindex', '-1');
      });

      /* ---- 2. 捲到第幾張，就亮第幾顆 ---- */
      function activeIndex() {
        // 用「捲動位置 ÷ 每張卡佔的寬度」算，比 getBoundingClientRect
        // 逐張比對便宜，而且 scroll-snap 保證每張等寬。
        var step = grid.scrollWidth / cards.length;
        if (!(step > 0)) return 0;
        var i = Math.round(grid.scrollLeft / step);
        return Math.max(0, Math.min(cards.length - 1, i));
      }

      function sync() {
        var i = activeIndex();
        dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
      }

      var ticking = false;
      grid.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; sync(); });
      }, { passive: true });

      /* ---- 3. 點圓點 → 捲到那位老師 ---- */
      box.addEventListener('click', function (e) {
        var dot = e.target.closest ? e.target.closest('.dot') : null;
        if (!dot) return;
        var i = +dot.getAttribute('data-idx') || 0;
        var card = cards[i];
        if (!card) return;
        // 置中對齊，跟 scroll-snap-align: center 一致。
        // scrollIntoView 的 inline:'center' 直接由瀏覽器算，
        // 不用擔心 offsetParent 到底是 grid 還是外面那層 wrap；
        // block:'nearest' 保證不會順便把整頁上下捲動。
        if (card.scrollIntoView) {
          try {
            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            return;
          } catch (err) { /* 舊瀏覽器不吃物件參數，往下走 */ }
        }
        var left = Math.max(0, card.offsetLeft - (grid.clientWidth - card.offsetWidth) / 2);
        if (grid.scrollTo) grid.scrollTo({ left: left, behavior: 'smooth' });
        else grid.scrollLeft = left;
      });

      sync();
      // 轉向 / 改變視窗寬度後每張卡的寬度會變，重算一次
      window.addEventListener('resize', function () { setTimeout(sync, 200); });
    })();

  });
})();
