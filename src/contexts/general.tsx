import { create } from "zustand";
import { Project } from "./project";
import { Org } from "./org";
type allDetails = {
  project: Project;
  org: Org;
  user: any;
};
type ProjectType = {
  project: Project;
  setProject: (Project: Project) => void;
};

export const useProject = create<ProjectType>()((set) => ({
  project: { name: "", id: "" },
  setProject: (project) => set({ project }),
}));
