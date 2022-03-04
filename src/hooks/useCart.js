import { useContext } from "react";
import AppContext from "../context";

export const UseCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
