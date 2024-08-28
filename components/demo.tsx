import React from "react";

interface DemoProps {
  name: string;
}

export const Demo: React.FC<DemoProps> = ({ name }) => {
  return <div>Hello các bạn {name}</div>;
};
