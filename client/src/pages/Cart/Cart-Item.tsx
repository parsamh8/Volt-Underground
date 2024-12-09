// Cart design tutorial and boiler plate used and modified from PedroTech on YouTube
import React, { useContext } from "react";
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

export const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const {
    id,
    posterUrl,
    title,
    price,
    address,
    venue,
    date,
    time,
    ticketLink
  } = data;

  // Define the ShopContext type
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    shopContext;
  console.log(data)
  return (
    <div className="checkout-item-card">
      {/* Event Image Section */}
      <div className="event-image-wrapper">
        <img src={posterUrl} alt={title} className="event-image" />
      </div>

      {/* Event Details */}
      <div className="event-details">
        <h3>{title}</h3>
        <p>
          <b>Date: </b> {date} {time}
        </p>
        <p>
          <b>Venue: </b> {venue}
        </p>
        <p>
          <b>Address: </b> {address}
        </p>
        <p>
          <b>Ticket Link: </b> {ticketLink}
        </p>
        <p>
          <b>Price: ${price}</b> 
        </p>
      </div>

      {/* Cart Controls */}
      <div className="cart-controls">
        <div className="count-handler">
          <button onClick={() => addToCart(id)} className="cart-button">
            {'| '}Add{' |'}
          </button>
          <button onClick={() => removeFromCart(id)} className="cart-button">
            {'| '}Remove{' |'}
          </button>
          <input
            type="number"
            className="cart-input"
            value={cartItems[id] || 0}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
        </div>
      </div>
    </div>
  );
};
