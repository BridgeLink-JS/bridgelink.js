import React, { FC, useState } from "react";
import { Item, BridgeLinkProps } from "../type/block";
import GridLayout from "react-grid-layout"; // Ensure correct import
import { RenderBlock } from "./block"; // Ensure correct import

export const BridgeLink: FC<BridgeLinkProps> = () => {
  const [data, setData] = useState<Item[]>([
    {
      id: "third-mobile-header-block",
      blockKey: "third-mobile-header-block",
      layout: {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        isDraggable: true,
      },
    },
    {
      id: "banner-carousel-block",
      blockKey: "banner-carousel-block",
      layout: {
        x: 0,
        y: 2,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "navbar-and-categories-block",
      blockKey: "navbar-and-categories-block",
      layout: {
        x: 0,
        y: 6,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "flash-sale-block",
      blockKey: "flash-sale-block",
      layout: {
        x: 0,
        y: 20,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "category-miniapp-block",
      blockKey: "category-miniapp-block",
      layout: {
        x: 0,
        y: 14,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "follow-oa-block",
      blockKey: "follow-oa-block",
      layout: {
        x: 0,
        y: 18,
        w: 4,
        h: 2,
        isDraggable: true,
      },
    },
    {
      id: "second-popular-products-block",
      blockKey: "second-popular-products-block",
      layout: {
        x: 0,
        y: 20,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "second-bestseller-products-block",
      blockKey: "second-bestseller-products-block",
      layout: {
        x: 0,
        y: 24,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "second-collections-block",
      blockKey: "second-collections-block",
      layout: {
        x: 0,
        y: 28,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "new-products-block",
      blockKey: "new-products-block",
      layout: {
        x: 0,
        y: 32,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
    {
      id: "view-by-user-block",
      blockKey: "view-by-user-block",
      layout: {
        x: 0,
        y: 36,
        w: 4,
        h: 4,
        isDraggable: true,
      },
    },
  ]);

  const addItem = (item: Item) => {
    setData((prev) => [...prev, item]);
  };

  const onDragStop = (layout: any, oldItem: any, newItem: any) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === newItem.i
          ? {
              ...item,
              layout: {
                ...item.layout,
                x: item.layout.x,
                y: newItem.y,
                w: item.layout.w,
                h: item.layout.h,
              },
            }
          : item
      )
    );
  };

  return (
    <GridLayout
      className={`layout`}
      cols={12}
      rowHeight={30}
      width={1200}
      layout={data.map((item) => ({
        ...item.layout,
        i: item.id,
      }))}
      compactType={"vertical"}
      isResizable={false}
      onDragStop={onDragStop}
      isDraggable={true}
      // draggableHandle=".react-grid-item"
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
