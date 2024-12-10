// Cart design tutorial and boiler plate used and modified from PedroTech on YouTube
import { useContext } from "react";
import * as React from "react";
import { ShopContext } from "../../context/Shop-Context";

// Define the props type for CartItem
interface CartItemProps {
  data: {
    posterUrl: string;
    id: number;
    title: string;
    price: number;
    address: string;
    venue: string;
    date: string;
    time: string;
    ticketLink: string;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ data }: any) => {
  const {
    id,
    posterUrl,
    title,
    price,
    venue,
    date,
    time,
  } = data;

  // Define the ShopContext type
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    shopContext;

  return (
    <div className="w-full flex items-center">
      {/* Event Image */}
      <div className="overflow-hidden rounded-lg w-20 h-30 bg-zinc-900 border border-gray-200">
        <img src={posterUrl} alt={title} />
      </div>

      {/* Event Details */}
      <div className="flex-grow pl-3">
        <h6 className="font-semibold uppercase text-xl text-white">{title}</h6>
        <p className="font-semibold uppercase text-base text-white">
          Location: {venue}
        </p>
        <p className="font-semibold uppercase text-base text-white">Date: {date}</p>
        <p className="font-semibold uppercase text-base text-white">Time: {time}</p>
        <p className="text-white">x {cartItems[id]}</p>
      </div>

      {/* Pricing and Controls */}
      <div>
        <span className="font-semibold text-white text-xl">
          ${price * cartItems[id]}
        </span>
        <span className="font-semibold text-white text-xl">.00</span>
        <div className="flex items-center mt-2">
          {/* Decrement Button */}
          <button
            onClick={() => removeFromCart(id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            -
          </button>

          {/* Input Field for Quantity */}
          <input
            type="number"
            value={cartItems[id] || 0}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            className="mx-2 w-16 h-8 text-center border border-gray-300 rounded text-black"
            style={{
              appearance: "none", // Removes the default browser arrows
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />

          {/* Increment Button */}
          <button
            onClick={() => addToCart(id)}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};