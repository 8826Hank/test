# 程式練習筆記

可直接發布到 GitHub Pages 的靜態網站，不用安裝網站框架或租伺服器。

## 第一次使用

1. 把這個資料夾的全部內容放進你的網站專案資料夾，用 VS Code 開啟。
2. 雙擊 index.html 可先在本機瀏覽；也能用你已有的 VS Code 網頁預覽工具。
3. 在 VS Code「原始檔控制」檢查檔案並暫存、提交，再發布到你選定的 GitHub 儲存庫。若沿用已有的程式儲存庫，把這份網站內容放在儲存庫根目錄，保留原本 .git，不要用其他 .git 覆蓋。
4. 到 GitHub 儲存庫 Settings → Pages → Build and deployment，選 Deploy from a branch。
5. 選你實際推送的分支（通常是 main），資料夾選 / (root)，按 Save。
6. 等待部署成功，從 Pages 頁面開啟網站網址。

免費個人 GitHub Pages 通常使用公開儲存庫，網站內容會公開。網站不包含帳號信箱或私人電腦路徑。

## 每次新增練習

- 將 C++ 原始檔放進 code/。
- 在 lessons.js 的 window.LESSONS 陣列加入一筆物件。
- 保留原有資料，在最後一筆後加逗號，再加入新物件。每筆 id 不能重複。

物件格式（示範欄位，請換成真實內容）：

```javascript
{
  id: 'binary-heap',
  category: 'heap',
  date: '2026-10-27',
  language: 'C++',
  title: '二元堆積的插入',
  summary: '觀察新元素如何逐層向上調整。',
  source: 'code/binary_heap.cpp',
  code: `在這裡貼上要展示的程式碼`,
  sections: [
    { title: '這次練習的觀念', text: '寫下你實際理解的內容。' }
  ]
}
```

category 支援 tree、heap、queue、stack、experiment。新增後分類計數與搜尋會自動更新。
code 是網站展示的版本，source 是下載的原始檔位置；修改時請兩者一起更新。JavaScript 樣板字串內的反斜線需寫成兩個，反引號也需跳脫。

第一篇的實驗時間軸與複習題是多執行緒專用，只在該篇顯示。新增其他主題時會顯示該筆資料的程式與解說，不會帶入多執行緒實驗。

## 更新網站

儲存檔案 → 檢查差異 → 暫存這次要更新的檔案 → 填提交訊息 → 提交 → 推送。
若使用 Sync Changes，它會先提取遠端變更，再推送；遇到衝突先處理後再繼續。
GitHub Actions 中的 Pages 部署成功後，重新整理網站確認內容。

## 檔案

- index.html：頁面結構。
- style.css：外觀與手機版排版。
- lessons.js：文章、展示程式碼與主題分類。
- app.js：搜尋、分類、文章與時間軸互動。
- code/：可下載的原始程式。
- .nojekyll：使用原樣靜態檔案發布。

網頁只展示程式與 JavaScript 時間軸，不會直接編譯執行 C++。目前未連接任何 GitHub 帳號，也尚未發布。
