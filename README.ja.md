# postcss-soft-comment-guard

一部の PostCSS プラグインによる強制 minify からコメントを保護するプラグイン

---

## インストール

```sh
npm install -D @ymmkrr/postcss-soft-comment-guard
```

---

## 使い方

`postcss.config.js`

```js
import { wrapComments, unwrapComments } from '@ymmkrr/postcss-soft-wrap-comments'

export default {
  plugins: [
    wrapComments(),   // パイプラインの先頭に配置
    // 他の PostCSS プラグイン
    unwrapComments(), // パイプラインの末尾に配置
  ],
}
```

---

## 動作原理
PostCSS プラグインの一部は、内部で強制的に minify を実行し、
それを無効化するオプションを用意していないことがあります。

cssnano などのほとんどの minify 系プラグインは、デフォルトで`/*!`で始まるコメントを保持します。
`/*!`で始まるコメントはに一般的に、ライセンスやその他の重要事項が記述されているためです。

このプラグインは通常のコメントの先頭に`!`から始まる定数文字列を自動的に付加し、
通常のコメントも強制除去から保護します。

### 入力

```css
/* 通常のコメント */
body {
  color: red;
}
```

### wrapComments 後

```css
/* !!GUARD!!通常のコメント */
body {
  color: red;
}
```

### unwrapComments 後

```css
/* 通常のコメント */
body {
  color: red;
}
```

---

## オプション

### `magicPrefix` (string)

コメントを保護するために付加する文字列です。

コメント除去処理から保護するために、この文字列の先頭を`!`から始める必要があります。

デフォルト:

```js
'!!GUARD!!'
```

`WrapComments` と `UnwrapComments` の双方に必ず同じ `magicPrefix` を指定してください。

---

## API

### `wrapComments(options?)`

PostCSS パイプラインの先頭に配置し、コメントを保護します。

### `unwrapComments(options?)`

PostCSS パイプラインの末尾に配置し、コメント保護のために一時的に付加した文字列を取り除きます。

---

## ライセンス

MIT‑0  

Copyright (c) 2026 夜御牧れる
