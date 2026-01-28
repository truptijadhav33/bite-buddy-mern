import api from "./api";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const refreshToken = (data) =>
  api.post("/auth/refresh-token", data);

export const logoutUser = () =>
  api.post("/auth/logout");
