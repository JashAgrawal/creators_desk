import apiService from "./apiClient";

export const createInvite = (data: any) => {
  return apiService.post("/invite", data);
};
export const getInviteById = (id: string) => {
  return apiService.get("/invite/" + id);
};
export const acceptInviteApi = (data: any) => {
  return apiService.post("/accept-invite", data);
};
export const postAPi = (url: string, data: any) => {
  return apiService.post(url, data);
};
export const getApi = (url: string) => {
  return apiService.get(url);
};
