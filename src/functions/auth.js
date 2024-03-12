import axios from "axios";

export const register = async (data) =>
  await axios.post(process.env.APP_PORT + "/register", data);

export const login = async (data) =>
  await axios.post('/api/login', data);
