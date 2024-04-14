import { create } from "zustand";

type ExpandedType = {
  expanded: boolean;
  setExpanded: () => void;
};

export const useExpanded = create<ExpandedType>()((set) => ({
  expanded: false,
  setExpanded: () => set((state: any) => ({ expanded: !state.expanded })),
}));
