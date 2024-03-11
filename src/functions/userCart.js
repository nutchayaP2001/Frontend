import axios from "axios";

export const userCart = async (cart) => {
  await axios.post("http://localhost:3000/api/users/carts", { cart });
};

export const getUserCart = async () => {
  await axios.get("http://localhost:3000/api/users/carts");
};
