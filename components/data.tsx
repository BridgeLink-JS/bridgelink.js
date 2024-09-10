import React, { FC, useState } from "react";
import { Item, BridgeLinkProps } from "../type/block";
import GridLayout from "react-grid-layout";
import { RenderBlock } from "./block";
import { first, map, max, min, size } from "lodash";

export const BridgeLink: FC<BridgeLinkProps> = ({
  className,
  value,
  onChange,
}) => {

  const moveItem = (id: string, direction: "up" | "down") => {
    const newData = [...value];
    const from = newData.find((item) => item.id === id);

    switch (direction) {
      case "up":
        const fromY = from.layout.y;
        const to = first(
          value
            .filter((item) => item.layout.y < fromY)
            .sort((a, b) => b.layout.y - a.layout.y)
        );

        const gap = fromY - (to?.layout.y + to?.layout.h) || 0;

        console.log("GAP", gap);

        from.layout.y = to.layout.y;
        to.layout.y = to.layout.y + gap + from.layout.h;

        break;

      case "down":
        const fromY1 = from.layout.y;
        const to1 = first(
          value
            .filter((item) => item.layout.y > fromY1)
            .sort((a, b) => a.layout.y - b.layout.y)
        );

        const gap1 = to1?.layout.y - fromY1 || 0;
        from.layout.y = to1.layout.y;
        to1.layout.y = to1.layout.y - gap1 - from.layout.h;

        break;
    }
    onChange(newData);
  };

  console.log("====> DATA", value);

  return (
    <GridLayout
      className={`layout ${className}`}
      cols={12}
      rowHeight={30}
      width={1200}
      layout={value.map((item) => ({
        ...item.layout,
        i: item.id,
      }))}
      draggableHandle=".drag-handle"
      compactType={"vertical"}
      onLayoutChange={(layout) => {
        const newLayout = map(layout, (itm) => ({
          id: itm.i,
          blockKey: value.find((item) => item.id === itm.i)?.blockKey || "",
          layout: {
            x: itm.x,
            y: itm.y,
            w: itm.w,
            h: itm.h,
          },
        }));
        onChange(newLayout);
      }}
    >
      {value.map((item) => {
        const isLast =
          max(value.map((item) => item.layout?.y + item.layout?.h)) ===
          item.layout?.y + item.layout?.h;
        const isTop =
          min(value.map((item) => item.layout?.y)) === item.layout?.y;

        return (
          <div
            key={item.id}
            className="border border-gray-200 border-dashed rounded-lg"
          >
            <div className="flex flex-row gap-2">
              <div className="drag-handle bg-white border border-gray-200 cursor-move text-gray-500 p-2 rounded-md shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="19" cy="5" r="1" />
                  <circle cx="5" cy="5" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                  <circle cx="19" cy="19" r="1" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </div>

              <div
                onClick={() => moveItem(item.id, "up")}
                className="cursor-pointer bg-white border border-gray-200 p-2 rounded-md shadow-lg"
                style={{
                  opacity: isTop ? 0.5 : 1,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 9-6-6-6 6" />
                  <path d="M12 3v14" />
                  <path d="M5 21h14" />
                </svg>
              </div>

              <div
                onClick={() => moveItem(item.id, "down")}
                className="cursor-pointer bg-white border border-gray-200 p-2 rounded-md shadow-lg"
                style={{
                  opacity: isLast ? 0.5 : 1,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 3H5" />
                  <path d="M12 21V7" />
                  <path d="m6 15 6 6 6-6" />
                </svg>
              </div>
            </div>
            <RenderBlock
              blockKey={item.blockKey}
              onUp={() => {
                moveItem(item.id, "up");
              }}
              onDown={() => {
                moveItem(item.id, "down");
              }}
            />
          </div>
        );
      })}
    </GridLayout>
  );
};

export default BridgeLink;
