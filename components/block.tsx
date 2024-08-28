import React, { FC } from "react";
import { Block, RenderBlockProps } from "../type/block";

const blocks: Block[] = [];

export const addBlock = (block: Block) => {
  const existingBlock = blocks.find((b) => b.key === block.key);
  if (existingBlock) {
    return;
  }
  blocks.push({
    key: block.key,
    name: block.name,
    render: block.render,
  });
};

export const RenderBlock: FC<RenderBlockProps> = (props) => {
  const block = blocks.find((block) => block.key === props.blockKey);
  if (!block) return null;
  return <>{block.render(props)}</>;
};
