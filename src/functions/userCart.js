import axios from "axios";

export const userCart = async (cart) => {
  await axios.post("/api/users/carts", { cart });
};

export const getUserCart = async () => {
  await axios.get("/api/users/carts");
};
