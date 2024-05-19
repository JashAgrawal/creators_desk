import { Toaster } from "@/components/ui/sonner";
import { IoAddCircle } from "react-icons/io5";
import { useExpanded } from "@/contexts/sidebar";
import Header from "@/components/common/header";
import Sidebar, { SidebarItem } from "@/components/common/leftMenu";
import { useAuth } from "@/contexts/useAuth";
import { useOrg } from "@/contexts/org";
import { useProject } from "@/contexts/project";
import { GoOrganization } from "react-icons/go";
import { SiCodeproject } from "react-icons/si";
import classNames from "classnames";

const AppLayout = ({ children }: { children: any }) => {
  const { expanded } = useExpanded();
  const { currentUser } = useAuth();
  const { org, setOrg, userOrgs } = useOrg();
  const { project, setProject, userProjects } = useProject();
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <Header />
      <div className="flex">
        <Sidebar>
          {org.id ? (
            <SidebarItem
              icon={<GoOrganization size={26} color="#3b82f6" />}
              text={org.name}
              semiActive
            />
          ) : (
            <SidebarItem
              icon={<IoAddCircle size={26} color="#3b82f6" />}
              text="Add Organistaion"
              active
            />
          )}
          {userProjects.map((projectt, idx) => (
            <div
              key={idx}
              className={classNames({ "flex items-start ml-2": expanded })}
            >
              {expanded && (
                <div className="flex items-end">
                  <div className="w-1 h-6 border-r-2  border-gray-600" />
                  <div className="w-2 h-1 border-b-2  border-gray-600 mr-1" />
                </div>
              )}
              <SidebarItem
                icon={<SiCodeproject size={26} className="text-indigo-500" />}
                text={projectt.name}
                active={projectt.id === project.id}
              />
            </div>
          ))}
          <div className={classNames({ "flex items-start ml-2": expanded })}>
            {expanded && (
              <div className="flex items-end">
                <div className="w-1 h-6 border-r-2 border-gray-600" />
                <div className="w-2 h-1 border-b-2 border-gray-600 mr-1" />
              </div>
            )}
            <SidebarItem
              icon={<IoAddCircle size={26} color="#3b82f6" />}
              text="Add Project"
            />
          </div>
        </Sidebar>
      </div>
      <div
        className="overflow-x-hidden h-full"
        style={{ marginLeft: expanded ? "13.2rem" : "3.5rem" }}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
