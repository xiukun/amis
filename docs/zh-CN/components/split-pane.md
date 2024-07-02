---
title: SplitPane 拆分面板
description:
type: 0
group: ⚙ 组件
menuName: SplitPane 拆分面板
icon:
order: 48
---

split-pane 拆分面板组件由两部分或更多部分组成，它们之间有一个可拖动的分割条.

## 基本用法

```schema: scope="body"
{
  "type": "container",
  "body": [{
      "type": "split-pane",
      "columns": [
        {
          "type": "container",
          "body": [
            {
              "type": "card",
              "header": {
                "title": "标题",
                "subtitle": "副标题"
              },
              "body": [
                {
                  "type": "tpl",
                  "tpl": "内容",
                  "wrapperComponent": "",
                  "inline": false
                }
              ],
              "actions": [
                {
                  "type": "button",
                  "label": "按钮",
                  "actionType": "dialog",
                  "dialog": {
                    "title": "标题",
                    "body": "内容"
                  }
                }
              ]
            }
          ],
          "size": "none",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "1 1 auto",
            "flexGrow": 1,
            "flexBasis": 0,
            "height": "100%",
            "overflowY": "visible",
            "width": "100%",
            "overflowX": "visible"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false
        },
        {
          "type": "container",
          "body": [
            {
              "type": "panel",
              "title": "标题",
              "body": [
                {
                  "type": "tpl",
                  "tpl": "内容",
                  "wrapperComponent": "",
                  "inline": false
                }
              ],
              "id": "u:ea1cb4081adb",
              "affixFooter": false,
              "className": "Panel--default mt-2"
            }
          ],
          "size": "none",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "1 1 auto",
            "flexGrow": 1,
            "flexBasis": 0,
            "height": "100%",
            "overflowY": "visible",
            "width": "100%",
            "overflowX": "visible"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false
        }
      ],
      "minPercent": 30,
      "defaultPercent": 60,
      "split": "horizontal",
      "style": {
        "position": "relative",
        "rowGap": "10px",
        "columnGap": "10px"
      }
    }],
  "style": {
    "position": "relative",
    "display": "flex",
    "inset": "auto",
    "flexWrap": "nowrap",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "height": "600px",
    "overflowY": "visible",
    "width": "100%",
    "overflowX": "visible"
  },
  "size": "none",
  "wrapperBody": false,
  "isFixedHeight": true,
  "isFixedWidth": true
}
```

外层需要设置高宽，`columns`数组必须存在两个对象，左右或者上下显示。`split`是分割线的方向，可以是垂直（'vertical'）或水平（'horizontal'），`minPercent`最小百分比，表示分割面板时，任一面板可以占据的最小比例。
`defaultPercent`默认百分比，表示在组件首次渲染时，一个面板默认占据的比例.

## 属性

| 属性名         | 类型                                          | 默认值                    | 说明                                                                             |
| -------------- | --------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------- |
| split          | 'vertical' &#124; 'horizontal'                | 'vertical'                | 'vertical' &#124; 'horizontal'                                                   |
| minPercent     | number                                        |                           | 最小百分比，表示分割面板时，任一面板可以占据的最小比例                           |
| defaultPercent | number                                        |                           | 默认百分比，表示在组件首次渲染时，一个面板默认占据的比例                         |
| columns        | Array<[SchemaNode](../docs/types/schemanode)> |                           | 数组必须存在两个对象,左右或者上下显示。                                          |
| paneOne        | ReactNode                                     |                           | 面板一的内容，可以是 React 节点或 JSX 元素，如果未定义则可能不会有面板一         |
| paneTwo        | ReactNode                                     |                           | 面板二的内容，可以是 React 节点或 JSX 元素，如果未定义则可能不会有面板二         |
| onResize       | function                                      | (percent: number) => void | （可选）调整大小事件回调，当面板的大小被改变时，会调用这个函数，并传入新的百分比 |
