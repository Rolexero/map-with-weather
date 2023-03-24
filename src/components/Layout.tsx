import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { Sidebar } from "./Sidebar";
import data from "../data.json";
import { StateTypes } from "../types";

interface LayoutProps {
  onClick: ({ lat, long }: StateTypes) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onClick,
}: LayoutProps) => {
  const [inputValue, setInputValue] = useState("");

  // * handle searchfield
  const SearchInputHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ currentTarget }) => {
      setInputValue(currentTarget.value);
    }, []);

  const filteredItems = data?.filter((i) => {
    if (i?.name?.toLowerCase().includes(inputValue.toLowerCase())) {
      return i;
    }
  });

  const contentsRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleReSize() {
    if (window.innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleReSize);
    }
    return () => {
      window.removeEventListener("resize", handleReSize);
    };
  }, []);

  return (
    <div className="relative z-50 flex h-full overflow-clip bg-[#FFFFFF] font-poppins">
      <div
        className={`absolute ${
          showNav ? "-left-0" : "-left-full"
        }   fixed z-[3000] h-full  min-w-[262px] bg-white transition-all lg:relative lg:left-0`}
      >
        <Sidebar
          filteredItems={filteredItems}
          onClick={onClick}
          closeSidebar={() => setShowNav(!showNav)}
        />
      </div>
      <div className=" flex w-full flex-1 overflow-x-auto">
        <div className=" flex h-full  w-full flex-1 flex-col overflow-hidden bg-[#F8FAFB]">
          <div className="fixed z-[1000] w-full md:w-[80%]">
            <div className="flex mx-auto items-center justify-center py-4  bg-white">
              <input
                type="text"
                placeholder="search"
                value={inputValue}
                onChange={(e) => SearchInputHandler(e)}
                className="px-2"
                autoComplete=""
              />
            </div>
            <button
              onClick={() => setShowNav(!showNav)}
              className="absolute top-4 left-5 z-50 cursor-pointer rounded-md border-[1px] p-1 text-4xl lg:hidden"
            >
              <Icon icon={"icon-park-outline:hamburger-button"} />
            </button>
          </div>
          <main
            className={`z-[2] mt-20 h-full px-4  bg-[#F8FAFB] font-inter transition-all duration-[400ms]`}
            ref={contentsRef}
            id="main"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
