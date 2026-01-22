import api from "./api";

export const getMenuItems = (params) =>
  api.get("/menu", { params });
