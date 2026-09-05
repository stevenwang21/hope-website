# 網站 Bug 檢查報告

## 2026-09-04 檢查
**結果：無新問題。** index.html（8/28）、courses.html、tracking.html 自上次檢查後皆無更動；`index_bugfix_test.html` 仍為 index.html + 昨日 3 項修正（8 行差異），本次未再修改。

本次沙盒無法下載 Chromium、線上網址（hopehope.net / GitHub Pages）瀏覽器仍被擋，所以只做靜態檢查：
- HTML 標籤配對：4 個檔案全部通過，無重複 id
- JS：index 9 段、courses 1 段、tracking 1 段內嵌腳本語法全部通過；JSON-LD 有效
- CSS：測試檔僅剩 `--text-1 / --c-primary / --pos` 未在 :root 定義，但全部有 fallback 值，不影響顯示
- 圖片：41 個本機圖片路徑全部存在，`<img>` 皆有 alt
- 連結：本機 href 與 `#錨點` 全部存在；無 http:// 混合內容；`target="_blank"` 皆有 rel
- 文案：仍有「20 多年」(1)、「近 40 年」(1)、「四十年」(1)、「30 年」(8)、「40 年」(3) 並存，待您決定統一

待確認事項與 9/3 相同（見下方 1–6）。若要恢復真實瀏覽器檢查，請在對話中開一次線上網址並核准存取。

---

## 2026-09-03 檢查
檢查範圍：index.html、courses.html、tracking.html

## 本次檢查結果摘要
三個頁面自 8/28 以來仍無更動。**本次首次以真實瀏覽器（Chromium 129）在沙盒內渲染本機檔案**，桌機 1366px 與手機 390px 各跑一遍：逐頁截圖、點擊全部導覽列與底部導覽、點擊全部按鈕（57 個）、滾動觸發 lazy 圖片、量測橫向溢出。
**新發現 2 個真實 bug，已在測試檔修正。** 線上網址（hopehope.net / GitHub Pages）仍被瀏覽器權限擋下，所以檢查的是本機檔案，不是線上版。

## 發現的問題

1. **【新・已修】手機版「關於我們」頁可以左右滑動（跑版）**
   `.about::before` 是一個 1000px 寬的裝飾光暈，沒有被裁切，導致手機版 About 頁整體寬度變成 695px（畫面只有 390px），底部導覽列也跟著被拉寬。其他 9 頁均正常。
   修正：`.about` 加上 `overflow: hidden;`（第 1007 行）。修正後 10 頁手機寬度全部 = 390。

2. **【新・已修】高中聯絡簿 6 張卡片點了會開一個空白分頁**
   高一英文、高二數學、高三物理/化學/數學/英文這 6 張卡片 `href="javascript:void(0)"` 卻帶 `target="_blank"`，Chrome 點下去會開 about:blank 空白頁。且 title 寫「最新聯絡簿」、日期由 JS 自動顯示「今天 更新」，但實際沒有連結，會誤導家長。
   修正：移除這 6 個 `target="_blank" rel="noopener"`，title 改為「連結尚未設定」（第 8102/8137/8162/8172/8182/8192 行）。修正後點擊不再開分頁。

3. **CSS 變數 `--text-muted` 未定義**（沿用，已在測試檔修正為 `--text-2`，第 7190 行）

4. **【請確認】國七英文部落格網址疑似錯字**：`steneneng-7.blogspot.com`（第 7973 行），其他為 `steveneng-8`、`steveneng-g9`。沙盒無法連外驗證，未改。

5. **【請確認】文案年數不一致**：手機版 About 頁同一屏就同時出現「20 多年來秉持此一信念」與「四十年的信念」（另 title/footer 為「30 年」）。

6. **【請確認】SEO 網域不一致**：canonical → GitHub Pages、og:url / sitemap → hopehope.net、robots.txt → ourhope.com.tw。

其餘正常：三頁在桌機與手機皆無 JavaScript 錯誤；本機圖片 46 張全部載入、無破圖（唯一載不到的是 YouTube 縮圖與外部字型/GA，屬沙盒無網路，非網站問題）；9 個桌機導覽連結與 5 個手機底部導覽全部正確切頁；57 個按鈕全部可點且無報錯；汪老師影片連結能正常開 modal；HTML 標籤配對、JSON-LD、內嵌 JS 語法全部通過。

## 已修正的內容（僅測試檔）
- `.about` 加 `overflow: hidden`（修手機橫向跑版）
- 6 個高中聯絡簿卡片移除 `target="_blank"`、title 改「連結尚未設定」
- `var(--text-muted)` → `var(--text-2)`

## 修改到的檔案
- `index_bugfix_test.html`（由今日 index.html 重新複製後套用上述 3 項修正，共 8 行差異）
- `bug-report.md`（本報告）
- 正式版 `index.html`、`courses.html`、`tracking.html` 未更動。

## 還需要您確認的地方
1. 測試檔的 3 項修正若沒問題，可直接把 `index_bugfix_test.html` 覆蓋為 `index.html`。
2. 高中 6 張聯絡簿卡片：要補上真正的部落格網址，還是先把 `data-status` 改成 `"empty"`（灰色不可點樣式已存在）？
3. `steneneng-7` 是否應為 `steveneng-7`？
4. 「20 多年 / 30 年 / 四十年」要統一成哪個。
5. canonical / og:url / sitemap / robots 網域要統一成哪一個。
6. 若要排程檢查線上版而非本機檔，請在對話中開一次 `hopehope.net` 並核准瀏覽器存取。
