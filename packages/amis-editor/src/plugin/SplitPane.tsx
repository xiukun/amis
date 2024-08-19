import {PlainObject} from 'amis';
import {
  BaseEventContext,
  BasePlugin,
  getSchemaTpl,
  registerEditorPlugin
} from 'amis-editor-core';

// 默认的列容器Schema
export const defaultSplitColumnSchema = (
  title?: string,
  disableFlexBasis: boolean = true
) => {
  let style: PlainObject = {
    position: 'static',
    display: 'block',
    flex: '1 1 auto',
    flexGrow: 1,
    flexBasis: 0,
    height: '100%',
    overflowY: 'visible',
    width: '100%',
    overflowX: 'visible'
  };
  if (disableFlexBasis) {
    style.flexBasis = 0;
  }
  return {
    type: 'container',
    body: [],
    size: 'none',
    style,
    wrapperBody: false,
    isFixedHeight: false,
    isFixedWidth: false
  };
};

const defaultFlexPreviewSchema = (title?: string) => {
  return {
    type: 'tpl',
    tpl: title,
    wrapperComponent: '',
    className: 'bg-light center',
    style: {
      position: 'static',
      display: 'block',
      flex: '1 1 auto',
      flexGrow: 1,
      flexBasis: 0,
      height: '100%',
      overflowY: 'visible',
      width: '100%',
      overflowX: 'visible'
    },
    inline: false
  };
};

// 默认的布局容器Schema
const defaultFlexContainerSchema = (
  flexItemSchema: (title?: string) => any = defaultSplitColumnSchema
) => ({
  type: 'split-pane',
  columns: [flexItemSchema('第一列'), flexItemSchema('第二列')],
  minPercent: 20,
  defaultPercent: 50,
  split: 'vertical',
  style: {
    position: 'relative',
    rowGap: '10px',
    columnGap: '10px'
  }
});

export class SplitPanePlugin extends BasePlugin {
  isBaseComponent = true;
  // 关联渲染器名字
  rendererName = 'split-pane';
  $schema = '/schemas/UnkownSchema.json';
  // 组件名称（组件面板显示的Title）
  name = '拆分面板';
  description =
    'split-pane拆分面板组件由两部分或更多部分组成，它们之间有一个可拖动的分割条';
  tags = ['布局容器']; // 自定义组件分类
  icon = 'fa-solid fa-bars-progress';
  pluginIcon = 'grid-plugin';
  order = -1; // 组件面板中的展示优先级，越小越靠前展示
  scaffold: any = defaultFlexContainerSchema();

  previewSchema = defaultFlexContainerSchema(defaultFlexPreviewSchema);

  panelTitle = '切割面板右侧面板';

  panelBodyCreator = (context: BaseEventContext) => {
    return [
      getSchemaTpl('tabs', [
        {
          title: '属性',
          body: [
            {
              name: 'minPercent',
              label: '最小宽度',
              type: 'input-number',
              suffix: '%'
            },
            {
              type: 'input-number',
              label: '默认宽度',
              name: 'defaultPercent',
              keyboard: true,
              suffix: '%'
            },
            {
              type: 'select',
              label: '分割线',
              name: 'split',
              options: [
                {
                  label: '竖线',
                  value: 'vertical'
                },
                {
                  label: '横线',
                  value: 'horizontal'
                }
              ],
              multiple: false
            }
          ]
        },
        {
          title: '外观',
          body: getSchemaTpl('collapseGroup', [
            getSchemaTpl('style:classNames', {isFormItem: false})
          ])
        }
      ])
    ];
  };
}

registerEditorPlugin(SplitPanePlugin);
