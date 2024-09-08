import React, { FC, useState } from "react";
import { Item, BridgeLinkProps } from "../type/block";
import GridLayout from "react-grid-layout"; // Ensure correct import
import { RenderBlock } from "./block"; // Ensure correct import
import { MdDragHandle, MdArrowUpward, MdArrowDownward } from "react-icons/md";

export const BridgeLink: FC<BridgeLinkProps> = ({ className }) => {
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
        y: 4,
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
        y: 10,
        w: 4,
        h: 10,
        isDraggable: true,
      },
    },
    // {
    //   id: "flash-sale-block",
    //   blockKey: "flash-sale-block",
    //   layout: {
    //     x: 0,
    //     y: 20,
    //     w: 4,
    //     h: 4,
    //     isDraggable: true,
    //   },
    // },
    // {
    //   id: "category-miniapp-block",
    //   blockKey: "category-miniapp-block",
    //   layout: {
    //     x: 0,
    //     y: 24,
    //     w: 4,
    //     h: 4,
    //     isDraggable: true,
    //   },
    // },
    // {
    //   id: "follow-oa-block",
    //   blockKey: "follow-oa-block",
    //   layout: {
    //     x: 0,
    //     y: 18,
    //     w: 4,
    //     h: 2,
    //     isDraggable: true,
    //   },
    // },
    {
      id: "second-popular-products-block",
      blockKey: "second-popular-products-block",
      layout: {
        x: 0,
        y: 20,
        w: 4,
        h: 8,
        isDraggable: true,
      },
    },
    {
      id: "second-bestseller-products-block",
      blockKey: "second-bestseller-products-block",
      layout: {
        x: 0,
        y: 28,
        w: 4,
        h: 8,
        isDraggable: true,
      },
    },
    {
      id: "second-collections-block",
      blockKey: "second-collections-block",
      layout: {
        x: 0,
        y: 32,
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
        y: 36,
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
        y: 40,
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

  const moveItem = (id, direction) => {
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return;

    // Determine the new index
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= data.length) return;

    // Swap items
    const updatedData = [...data];
    const [movedItem] = updatedData.splice(index, 1);
    updatedData.splice(newIndex, 0, movedItem);

    setData(updatedData);
  };

  return (
    <GridLayout
      className={`layout ${className}`}
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
    >
      {data.map((item) => (
        <div key={item.id} className="border border-black relative">
          <MdDragHandle
            size={20}
            className="absolute left-[-0.75rem] top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
          <div className="ml-10">
            <RenderBlock blockKey={item.blockKey} />
          </div>
          <button
            className="absolute top-2 right-10 bg-transparent border-none cursor-pointer"
            onClick={() => moveItem(item.id, "up")}
            aria-label="Move up"
          >
            <MdArrowUpward size={20} className="text-blue-500" />
          </button>
          <button
            className="absolute top-10 right-10 bg-transparent border-none cursor-pointer"
            onClick={() => moveItem(item.id, "down")}
            aria-label="Move down"
          >
            <MdArrowDownward size={20} className="text-blue-500" />
          </button>
        </div>
      ))}
    </GridLayout>
  );
};

export default BridgeLink;
