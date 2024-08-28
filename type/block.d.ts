export interface Block {
  key: string;
  name: string;
  render: (children: any) => JSX.Element;
}

export interface RenderBlockProps {
  blockKey: string;
}
