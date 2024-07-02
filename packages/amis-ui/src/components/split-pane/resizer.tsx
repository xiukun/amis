import React, {PropsWithChildren, useMemo} from 'react';
import {SplitPanResizerProps} from './type';

export default function Resizer({
  split,
  className,
  style,
  onMouseDown,
  onClick
}: PropsWithChildren<SplitPanResizerProps>) {
  // 拼接class
  const classes = useMemo(() => {
    return ['splitter-pane-resizer', split, className].join(' ');
  }, [split, className]);

  // 监听style
  const styles = useMemo(() => {
    return style;
  }, [style]);

  return (
    <div
      className={classes}
      style={styles}
      onMouseDown={onMouseDown}
      onClick={onClick}
    ></div>
  );
}
