import { createContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";

// Define the type for the product
interface Product {
  posterUrl: string;
  id: number;
  title: string;
  price: number;
  address: string;
  venue: string;
  date: string;
  time: string;
  ticketLink: string;
}  

// Define the type for the cart
type Cart = Record<number, number>;

// Define the type for the context value
interface ShopContextValue {
  cartItems: Cart;
  addToCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  getTotalCartAmount: () => number;
  checkout: () => void;
}

const defaultShopContext: ShopContextValue = {
  cartItems: {},
  addToCart: () => {},
  updateCartItemCount: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  checkout: () => {},
};

// Define the props for the provider
interface ShopContextProviderProps {
  children: ReactNode;
}

// Create the context with the appropriate type
export const ShopContext = createContext<ShopContextValue>(defaultShopContext);

// Function to generate the default cart from localStorage
const getCartFromLocalStorage = (): Cart => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : {}; // If cart is in localStorage, parse it; otherwise, return an empty object
};

// Context provider component
export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const [cartItems, setCartItems] = useState<Cart>(getCartFromLocalStorage());

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Get total cart amount
  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = events.find((product: Product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId: number) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartItemCount = (newAmount: number, itemId: number) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: newAmount };
      localStorage.setItem("cartItems", JSON.stringify(newCart)); // Persist the updated cart to localStorage
      return newCart;
    });
  };

  const checkout = () => {
    const newCart = {"1":0,"2":0,"3":0,"4":0,"5":0}
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const contextValue: ShopContextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};
