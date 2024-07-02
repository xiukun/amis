type ColumnClassName =
  | string
  | {
      [propName: string]: string | boolean | null | undefined;
    };

export interface SplitPaneProps {
  minPercent: number;
  defaultPercent: number;
  split: 'vertical' | 'horizontal';
  paneOne?: React.ReactNode | React.JSX.Element;
  paneTwo?: React.ReactNode | React.JSX.Element;
  columns?: Array<any>;
  forwardedRef?: any;
  onResize?: (percent: number) => void;
}

export type SplitPanResizerProps = {
  split: 'horizontal' | 'vertical';
  className?: string;
  style: React.CSSProperties;
  onMouseDown: () => void;
  onClick: () => void;
};
