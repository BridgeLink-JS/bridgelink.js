import React, { FC, useState } from "react";
import { Item, BridgeLinkProps } from "../type/block";
import GridLayout from "react-grid-layout"; // Ensure correct import
import { RenderBlock } from "./block"; // Ensure correct import

export const BridgeLink: FC<BridgeLinkProps> = () => {
  const [data, setData] = useState<Item[]>([
    {
      id: "1",
      blockKey: "block1",
      layout: {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
    },
    {
      id: "2",
      blockKey: "block2",
      layout: {
        x: 2,
        y: 0,
        w: 2,
        h: 2,
      },
    },
    {
      id: "3",
      blockKey: "image",
      layout: {
        x: 4,
        y: 0,
        w: 2,
        h: 2,
      },
    },
  ]);

  const addItem = (item: Item) => {
    setData((prev) => [...prev, item]);
  };

  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={30}
      width={1200}
      layout={data.map((item) => ({
        ...item.layout,
        i: item.id,
      }))}
    >
      {data.map((item) => (
        <div key={item.id}>
          {" "}
          {/* Added div wrapper to satisfy GridLayout's needs */}
          <RenderBlock blockKey={item.blockKey} />
        </div>
      ))}
    </GridLayout>
  );
};

export default BridgeLink;
