# postcss-soft-comment-guard

Simple PostCSS workaround to keep comments under forced minification.

---

## Installation

```sh
npm install -D @ymmkrr/postcss-soft-comment-guard
```

---

## Usage

Add the plugins to your PostCSS configuration.

```js
import { wrapComments, unwrapComments } from '@ymmkrr/postcss-soft-comment-guard'

export default {
  plugins: [
    wrapComments(),   // protect comments before other plugins force remove them
    // ...other PostCSS plugins...
    unwrapComments(), // restore comments after all processing
  ],
}
```

---

## How it works
Some PostCSS plugins perform internal minification that cannot be toggled off.

By default, most minifiers, such as cssnano, preserve comments starting with `/*!`
because comments starting with `/*!` are commonly used for licenses or other important notices.

This plugin automatically prepends a magic prefix (starting with `!`) to regular comments
to prevent them from being stripped.

### Input

```css
/* normal comment */
body {
  color: red;
}
```

### After wrapComments

```css
/* !!GUARD!!normal comment */
body {
  color: red;
}
```

### After unwrapComments

```css
/* normal comment */
body {
  color: red;
}
```

---

## Options

### `magicPrefix` (string)

A string added to the beginning of each non‑important comment.

This prefix must start with `!` to prevent comments from being stripped.

Default:

```js
'!!GUARD!!'
```

You must use the same prefix for both `wrapComments` and `unwrapComments`.

---

## API

### `wrapComments(options?)`

Wraps comments at the start of the PostCSS pipeline.

### `unwrapComments(options?)`

Unwraps comments at the end of the PostCSS pipeline.

---

## License

MIT‑0  

Copyright (c) 2026 Reru YAMIMAKI
