export interface Block {
  key: string;
  name: string;
  render: (tools: { up: () => void; down: () => void }) => JSX.Element;
}

interface Item {
  id: string;
  blockKey: string;
  layout: BlockLayout;
}

interface BlockLayout {
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  isDraggable?: boolean;
  isResizable?: boolean;
  isBounded?: boolean;
  resizeHandles?: string[];
}

export interface RenderBlockProps {
  blockKey: string;
  onUp: () => void;
  onDown: () => void;
}

export interface BridgeLinkProps {
  className: string;
}
