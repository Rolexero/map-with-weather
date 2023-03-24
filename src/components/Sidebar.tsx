import { Icon } from "@iconify/react";
import React from "react";
import { StateTypes } from "../types";

interface SidebarProps {
  onClick: ({ lat, long, name, id }: StateTypes) => void;
  closeSidebar: () => void;
  filteredItems: StateTypes[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  filteredItems,
  onClick,
  closeSidebar,
}: SidebarProps) => {
  return (
    <div className="p-6">
      <button
        className="ml-auto block w-fit p-3 text-2xl text-black lg:hidden"
        onClick={closeSidebar}
      >
        <Icon icon="material-symbols:close" />
      </button>

      <p className="text-center font-medium text-2xl  ">States </p>
      <div className="flex flex-col gap-2 py-2">
        {filteredItems.map((state: StateTypes, id) => {
          return (
            <button
              key={id}
              onClick={() => {
                closeSidebar();
                onClick({
                  lat: state.lat,
                  long: state.long,
                  name: state.name,
                  id: state.id,
                });
              }}
            >
              {state.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
