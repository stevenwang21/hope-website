/* ============================================================
   bugfix-patch.js  ·  2026-09-19 更新（原 09-12 / 09-14 / 09-15 / 09-16 / 09-17 / 09-18）
   希望文理補習班網站 bug 修正（測試用，未套進 index.html）

   用法：在 index.html 的 </body> 前加一行
         <script src="bugfix-patch.js"></script>
   或直接開 bugfix-test.html 預覽效果。

   ------------------------------------------------------------
   本次（09-19）的異動：
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
       例（index.html 8625–8629 行，最新消息）：

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

       同一個寫法在六個地方出現，行號與附帶災情：

         8627  最新消息 newsModal              只有 hidden
         9712  線上課程購物車（已停用的區塊）   只有 hidden
        10637  四位老師的影片彈窗              hidden ＋ unmountLive()
                 （wangVideosModal / fangVideosModal /
                   lianVideosModal / houVideosModal）
        12396  會考英雄榜 championLightbox     只有 hidden
        12851  家長選擇我們的理由 bentoModal   hidden ＋ body.innerHTML = ''
        12913  獎學金放大 scholarshipZoom      hidden ＋ img.src = ''

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
        'wangVideosModal', 'fangVideosModal', 'lianVideosModal', 'houVideosModal'
      ].forEach(function (id) { guard(document.getElementById(id)); });

      // 線上課程的購物車彈窗（目前入口已停用，一併保護以免日後開回來）
      document.querySelectorAll('.shop-modal').forEach(guard);
    })();

  });
})();
