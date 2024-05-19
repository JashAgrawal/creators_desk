import { create } from "zustand";
export type Project = {
  name: string;
  id: string;
};
type ProjectType = {
  userProjects: Project[];
  project: Project;
  setProject: (Project: Project) => void;
  setUserProjects: (Project: Project[]) => void;
};

export const useProject = create<ProjectType>()((set) => ({
  project: { name: "", id: "" },
  setProject: (project) => set({ project }),
  userProjects: [],
  setUserProjects: (projects) => set({ userProjects: projects }),
}));
