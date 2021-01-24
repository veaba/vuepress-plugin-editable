# vuepress-plugin-editable

Let's editing vuepress generate docs so easy!

## Why vuepress-plugin-editable

Based on vuepress + markdown ecosystem simplifies the intermediate process and can be quickly applied to the article creation and revision process.

You don't even need to open vscode, you just find a mistake while reading the documentation and correct it as you go.

This will lower the threshold for developers to participate in open source documentation maintenance.

## Usage

1. Double-click on the vuepress generated content.

2. OAuth github account and PR to repo's source file.

## Features

TODO

- TODO: vuepress ecosystem

- TODO: vitepress ecosystem

- 当行提交 PR

- 未处理当 存在 a 标签时候等其他情况，假设现在是 纯文本

- TODO: 由于渲染逻辑较为复杂，所以这里不好直接应用 `content` 作为新更改的数据，而是根据 app 重新拉取过来


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

### Server: go land (maybe can use node.js)

### Client:

    - npm dep (vuepress-plugin-editable)

    - cdn support

### API Design

- 指定父级包含标签
- 指定 web 站点对应的 repo，以及正则匹配的地址
- 发起请求之前校验提示
- 双英文对照
- 因为 vuepress 内含有一些 vue 组件，所以不能直接纯 HTML 解析为 markdown 来创建 PR
- 埋点行为： line 数

## Reference

- [First draft](https://github.com/vuejs/docs-next-zh-cn/discussions/377#discussioncomment-298623)
