import { create } from "zustand";
export type Org = {
  name: string;
  id: string;
};
type OrgType = {
  userOrgs: Org[];
  org: Org;
  setOrg: (org: Org) => void;
  setUserOrgs: (org: Org[]) => void;
};

export const useOrg = create<OrgType>()((set) => ({
  org: { name: "", id: "" },
  setOrg: (org) => set({ org }),
  userOrgs: [],
  setUserOrgs: (Orgs) => set({ userOrgs: Orgs }),
}));
