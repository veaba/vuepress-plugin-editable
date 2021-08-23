﻿# Vuepress-plugin-editable

## Why vuepress-plugin-editable

Based on vuepress + markdown ecosystem simplifies the intermediate process and can be quickly applied to the article creation and revision process.222

You don't even need to open vscode, you just find a mistake while reading the documentation and correct it as you go.

This will lower the threshold for developers to participate in open source documentation maintenance.

## Install

1. install dep

```sh
npm install -D vuepress-plugin-editable
# OR yarn add -D vuepress-plugin-editable
```

2. `.vuepress/config.js`

```js
module.exports = {
  // * Must be.
  plugins: [["vuepress-plugin-editable"]],
  // * Must be. repo name
  themeConfig: {
    repo: "veaba/vue-docs",
  },
  // ...
};
```

## Usage

1. Double-click on the vuepress generated content.

2. OAuth github account and PR to repo's source file.

## Examples

### Plain text mode

I am a lonely line of text (double click me).

### Complex text mode

I am a **complex text** with many `brothers` and `sisters`, my website is [editable.veaba.me](https://editable.veaba.me/) (double click me).
