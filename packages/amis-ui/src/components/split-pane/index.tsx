import React, {useState, useCallback} from 'react';
import Resizer from './resizer';
import {SplitPaneProps} from './type';
const Ele: React.FC<SplitPaneProps> = ({
  minPercent,
  defaultPercent,
  split,
  paneOne,
  paneTwo,
  columns,
  ...otherProps
}) => {
  const [percent, setPercent] = useState(defaultPercent);
  const [active, setActive] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const type = split === 'vertical' ? 'width' : 'height';
  const resizeType = split === 'vertical' ? 'left' : 'top';
  const leftClass = `splitter-pane splitter-paneL ${split}`;
  const rightClass = `splitter-pane splitter-paneR ${split}`;

  function renderChild(region: string, node: any, props: any = {}) {
    const {render} = otherProps as any;
    if (!render) {
      return node;
    } else {
      return render(region, node, {key: region});
    }
    // return render ? render(region, node, props) : node
  }
  const onResize = (newPercent: number) => {
    setPercent(newPercent);
    // 如果组件是独立使用的，可以替换为合适的回调函数或者状态更新逻辑
    otherProps.onResize && otherProps.onResize(newPercent);
  };

  const onMouseDown = useCallback(() => {
    setActive(true);
    setHasMoved(false);
  }, []);

  const onMouseUp = useCallback(() => {
    setActive(false);
  }, []);

  const onMouseMove = useCallback(
    (event: any) => {
      if (event.buttons === 0 || event.which === 0) {
        setActive(false);
      }

      if (active) {
        let offset = 0;
        let target = event.currentTarget;
        if (split === 'vertical') {
          while (target) {
            offset += target.offsetLeft;
            target = target.offsetParent as HTMLDivElement;
          }
        } else {
          while (target) {
            offset += target.offsetTop;
            target = target.offsetParent as HTMLDivElement;
          }
        }

        const currentPage = split === 'vertical' ? event.pageX : event.pageY;
        const targetOffset =
          split === 'vertical'
            ? event.currentTarget.offsetWidth
            : event.currentTarget.offsetHeight;
        const percents =
          Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100;

        if (percents > minPercent && percents < 100 - minPercent) {
          setPercent(percents);
          onResize(percents);
        }

        setHasMoved(true);
      }
    },
    [active, minPercent, split, onResize]
  );

  const onClick = useCallback(() => {
    if (!hasMoved) {
      setPercent(50);
      onResize(50);
    }
  }, [hasMoved, onResize]);

  return (
    <div
      className="ag-splitter-container clearfix"
      style={{
        cursor: active
          ? split === 'vertical'
            ? 'col-resize'
            : 'row-resize'
          : 'default'
      }}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className={leftClass} style={{[type]: `${percent}%`}}>
        {/* {paneOne || columns?.[0]?.body?.[0] || null} */}
        {renderChild('column/0', paneOne || columns?.[0], 0)}
      </div>
      <Resizer
        style={{[resizeType]: `${percent}%`}}
        split={split}
        onMouseDown={onMouseDown}
        onClick={onClick}
      />
      <div className={rightClass} style={{[type]: `${100 - percent}%`}}>
        {/* {paneTwo || columns?.[1]?.body?.[0] || null} */}
        {renderChild('column/1', paneTwo || columns?.[1], 1)}
      </div>
      {active && <div className="ag-splitter-container-mask" />}
    </div>
  );
};

export default class SplitPane extends React.PureComponent<any, any> {
  render() {
    const p: any = this.props;
    return <Ele {...p} />;
  }
}
