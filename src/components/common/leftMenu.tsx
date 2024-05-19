import { useOrg } from "@/contexts/org";
import { useExpanded } from "@/contexts/sidebar";
import { useAuth } from "@/contexts/useAuth";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { GoOrganization } from "react-icons/go";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SidebarContext = createContext({
  expanded: false,
});

export default function Sidebar({ children }: { children: any }) {
  const { expanded, setExpanded } = useExpanded();
  const { currentUser } = useAuth();
  return (
    <aside className="h-screen z-[999] fixed top-0 bottom-0 left-0">
      <nav className="h-full flex flex-col bg-white border-r border-indigo-800 shadow-sm">
        <div className="p-1.5 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-24" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex p-1.5">
          <div className="w-10 h-10 rounded-md bg-indigo-500 flex justify-center items-center">
            <span className="text-white font-semibold">
              {currentUser?.displayName?.slice(0, 2).toLocaleUpperCase()}
            </span>
          </div>

          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-36 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{currentUser?.displayName}</h4>
              <span className="text-xs text-gray-600">
                {currentUser?.email}
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  semiActive,
  alert,
}: {
  icon?: any;
  text?: string;
  active?: boolean;
  semiActive?: boolean;
  alert?: boolean;
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center justify-center
        font-medium rounded-md cursor-pointer
        transition-colors group
        my-1
        py-1
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${
          semiActive
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${expanded && " p-1 py-2"}
    `}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-36 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 w-32
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          text-center
          border border-indigo-800
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
