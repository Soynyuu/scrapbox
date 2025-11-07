# Scrapbox Userscripts

Scrapboxの使い勝手を向上させるuserscriptsです。

## 機能

### 🌙 ZZen Mode

集中して執筆するための「Zen Mode」ボタンをツールバーに追加する機能です。

**特徴:**
- ページの背景を黒に変更
- ナビゲーションバー、サイドバーなどの要素をホバー時以外非表示
- ワンクリックでオン/オフ切り替え

**動作:**
1. ツールバーに追加される 🌙 アイコンをクリック
2. Zen Modeが有効化される
3. もう一度クリックで通常モードに戻る

### 📅 Daily Template

毎日のページを素早く作成できる「Daily Template」ボタンを追加する機能です。

**特徴:**
- 今日の日付（YYYY-MM-DD形式）のページを自動作成
- 前日の未完了Todoを自動的に引き継ぎ
- Todo/Doneセクションのテンプレートを自動生成

**動作:**
1. 新規ページボタンの横に追加される 📅 アイコンをクリック
2. 今日の日付のページが自動的に作成される
3. 前日に完了しなかったTodoが自動的にコピーされる

## インストール方法

### Tampermonkey / Greasemonkey を使用

1. ブラウザにTampermonkeyまたはGreasemonkeyをインストール
   - [Tampermonkey (Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey (Firefox)](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. 新しいスクリプトを作成
3. `script.js` の内容をコピー＆ペースト
4. 必要に応じて `style.css` の内容も追加
5. スクリプトを保存して有効化

### Userscript ヘッダー例

```javascript
// ==UserScript==
// @name         Scrapbox Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Zen Mode and Daily Template for Scrapbox
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==
```

## カスタマイズ

### Zen Modeの背景色

`script.js` の19行目で背景色が設定されています：

```javascript
var bg = 'black'  // 他の色（例: 'navy', '#1a1a1a' など）に変更可能
```

### Daily Templateのフォーマット

`script.js` の102-106行目でテンプレートの内容が定義されています：

```javascript
let content = '## Todo\n'
if (yesterdayTodos.length > 0) {
  content += yesterdayTodos.join('\n') + '\n'
}
content += '\n## Done\n'
```

## ファイル構成

```
.
├── README.md       # このファイル
├── script.js       # メインのuserscriptコード
└── style.css       # スタイルのカスタマイズ
```
