import React from "react";
import { StateTypes } from "../types";

interface SidebarProps {
  onClick: ({ lat, long, name, id }: StateTypes) => void;
  filteredItems: StateTypes[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  filteredItems,
  onClick,
}: SidebarProps) => {
  return (
    <div className="p-6">
      <p className="text-center font-medium text-2xl  ">States </p>
      <div className="flex flex-col gap-2 py-2">
        {filteredItems.map((state: StateTypes, id) => {
          return (
            <button
              key={id}
              onClick={() =>
                onClick({
                  lat: state.lat,
                  long: state.long,
                  name: state.name,
                  id: state.id,
                })
              }
            >
              {state.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
