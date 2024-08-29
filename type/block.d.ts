export interface Block {
  key: string;
  name: string;
  render: (children: any) => JSX.Element;
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
}

export interface RenderBlockProps {
  blockKey: string;
}

export interface BridgeLinkProps {}
