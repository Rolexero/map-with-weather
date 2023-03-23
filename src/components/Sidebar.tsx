import React from "react";
import data from "../data.json";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="p-6">
      <p className="text-center font-medium text-2xl ">States </p>
    </div>
  );
};
