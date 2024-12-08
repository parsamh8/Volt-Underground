// Cart design tutorial used and modified from PedroTech on YouTube
import { createContext, useState, ReactNode } from "react";
import { PRODUCTS } from "../Events";

// Define the type for the product
interface Product {
  posterUrl: string,
  id: number,
  title: string,
  price: number,
  address: string,
  venue: string,
  date: string,
  time: string,
  ticketLink: string
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

// Function to generate the default cart
const getDefaultCart = (): Cart => {
  const cart: Cart = {};
  for (let i = 1; i <= PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

// Context provider component
export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Cart>(getDefaultCart());

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = PRODUCTS.find((product: Product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
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
