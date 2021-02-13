# vuepress-plugin-editable

Let's editing vuepress generate docs so easy!

> Safety Warning: Currently, to facilitate functionality, veaba-bot explicitly redirects the Github AccessToken to the url of your launch oAuth page. For the security of your Github account, please always avoid revealing the AccessToken to third parties, including [veaba-bot](), veaba ](https://github.com/veaba/veaba-bot), `veaba-bot` will not keep storing your `AccessToken` information. Your `AccessToken` is passed to `veaba-bot` via the Rquest header `access-token` set in fetch.

> 安全警告：目前为了方便实现功能，`veaba-bot` 会显式地将 Github `AccessToken` 重定向到你的发起 oAuth 页面的 url，为了你的 Github 账号安全，请始终避免泄露 `AccessToken` 给第三方，包括 [veaba-bot](https://github.com/veaba/veaba-bot)，`veaba-bot` 不会保留存储你的 `AccessToken`信息。你的 `AccessToken` 是通过 fetch 里设置的 Rquest header `access-token` 传递给 `veaba-bot`。

## Why vuepress-plugin-editable

Based on vuepress + markdown ecosystem simplifies the intermediate process and can be quickly applied to the article creation and revision process.

You don't even need to open vscode, you just find a mistake while reading the documentation and correct it as you go.

This will lower the threshold for developers to participate in open source documentation maintenance.

## Install

```sh
npm install -D vuepress-plugin-editable
# OR yarn add -D vuepress-plugin-editable
```

## Usage

1. Double-click on the vuepress generated content.

2. OAuth github account and PR to repo's source file.

## Features

- [x] vuepress ecosystem

- TODO: vitepress ecosystem

- [x] plain text mode: HTML setting `contenteditable:true` redirect pull request.

- [x] complex text mode: diff origin source file content.

- [x] success/error alert ui

## Design

### Resolution

- 1. HTML 如何映射 Markdown 源码 的问题：这个仓库只是为了解决 HTML 对应 markdown 源文件如何定位的问题。

  - 对 markdown 生成 HTML 埋点
  - 目的是为了解决映射问题

- 2. OAuth： 需要写一个后端服务来发起完成授权，但是这并非真的必须

  - 除非把这套系统作为的一个单独的 APP 产品
  - 如果在浏览器中输入 url，即可自动填写 pr 更改的内容就好
    - 类似 vue-next，需要跳转第三方填写表单才跳回来 github 主站从 url 解析字段填写到 issue

- 3. vuepress 双击发起这个过程的插件：这需要真正的 基于 dom 操作发起了，前述 1、3 是否合并成为一个插件的。

结论：

- 方案 1：最多维护(1+2+3)
- 方案 2：最少维护 (1+3)，假设 1+3 点可以合并，2 点可不需要的情况下。
  - 弊端：不要 app 的情况下，会让用户走流程，只是加了链接过去
- 方案 3：PR 的过程交由 特别的 OAuth-app 来完成，假设 2 点需要的情况下
  - 这需要额外的服务端开发能力 + 服务器

### Server: go lang

- [Private: veaba-bot](https://github.com/veaba/veaba-bot)

### Client:

    - npm dep (vuepress-plugin-editable)

    - cdn support

### API Design

- 指定父级包含标签
- 指定 web 站点对应的 repo，以及正则匹配的地址
- 发起请求之前校验提示
- 双英文对照 n
- 因为 vuepress 内含有一些 vue 组件，所以不能直接纯 HTML 解析为 markdown 来创建 PR
- 埋点行为： line 数

## Bug

Listed not supported yet!

1. custom container

```txt
::: warning
*here be dragons*
:::

```

2. defintion code

```txt
:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```

3. img

4. table

5. code

6. Emphasis

```txt

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

```

## Reference

- [First draft](https://github.com/vuejs/docs-next-zh-cn/discussions/377#discussioncomment-298623)
