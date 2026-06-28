# 部落格模板

這是一個使用 Astro + Tailwind CSS + SolidJS 開發的部落格模板，可部署到 GitHub Pages。

## 技術棧

- [Astro](https://astro.build/) 4.x
- [Tailwind CSS](https://tailwindcss.com/) 3.x
- [SolidJS](https://www.solidjs.com/)
- [Fuse.js](https://fusejs.io/)（站內搜尋）
- GitHub Actions 自動部署到 GitHub Pages

## 開始使用

```bash
npm install
npm run dev
```

開啟 http://localhost:4321 預覽。

## 建置

```bash
npm run build
```

靜態檔案會輸出到 `dist/`。

## 部署到 GitHub Pages

1. 將專案推送到 GitHub Repository。
2. 修改 `astro.config.mjs` 中的 `site` 與 `base`：
   - `site`：你的 GitHub Pages 網址，例如 `https://username.github.io`
   - `base`：Repository 名稱，例如 `/personVlog`；如果是 `<username>.github.io` 則設為 `/`
3. 在 GitHub Repository 設定中啟用 Pages，選擇 **GitHub Actions** 作為來源。
4. 推送任意 commit 到 `main` 分支即會觸發部署。

## 新增文章

在 `src/content/posts/` 新增 Markdown 檔案，frontmatter 格式如下：

```md
---
title: "文章標題"
description: "文章描述"
date: 2026-06-17
category: random
tags: []
draft: false
---

文章內容...
```

可用的 `category` 請參考 `src/consts.ts` 中的 `CATEGORIES`。

## 功能清單

- [x] 首頁 Terminal Hero + 生活紀錄橫向滾動 + 年份分組文章列表 + 分頁
- [x] 分類頁面與分頁
- [x] 文章詳細頁面（Markdown、目錄、程式碼複製）
- [x] 深色 / 淺色模式切換
- [x] SolidJS 站內搜尋（Ctrl + K）
- [x] RSS Feed (`/rss.xml`)
- [x] Sitemap
- [x] SEO meta、Open Graph、Twitter Card
- [x] GitHub Actions 自動部署
