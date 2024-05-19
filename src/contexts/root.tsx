import { useProject } from "./project";
export interface pathType {
  name: string;
  id: string;
}
export interface FOLDER {
  name: string;
  id: string;
  path: pathType[];
}
export const useRoot = (): { ROOT_FOLDER: FOLDER } => {
  const { project } = useProject();
  const ROOT_FOLDER = { name: project.name, id: project.id, path: [] };
  return { ROOT_FOLDER };
};
