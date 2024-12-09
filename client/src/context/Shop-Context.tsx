import { createContext, useState, ReactNode, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

// Define the type for the event
interface Event {
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

// Function to load the cart from localStorage
const loadCartFromLocalStorage = (): Cart => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : {}; // Load from localStorage or return an empty cart
};

// Function to generate the default cart based on the events
const getDefaultCart = (events: Event[]): Cart => {
  const cart: Cart = {};
  events.forEach((event) => {
    cart[event.id] = 0;  // Initialize cart with each event ID and set the amount to 0
  });
  return cart;
};

// Context provider component
export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const { data: eventsData } = useQuery(QUERY_EVENTS);
  const events = eventsData?.events || [];

  // Initialize cartItems state from localStorage (if available)
  const [cartItems, setCartItems] = useState<Cart>(loadCartFromLocalStorage);

  // Ensure the cartItems are updated only once the events data is loaded
  useEffect(() => {
    if (events.length > 0 && Object.keys(cartItems).length === 0) {
      setCartItems(getDefaultCart(events)); // Initialize if no cartItems are found
    }
  }, [events, cartItems]);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Persist cart to localStorage
    }
  }, [cartItems]);

  // Get total cart amount
  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = events.find((event: Event) => event.id === Number(item));
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
