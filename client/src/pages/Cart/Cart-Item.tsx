// Cart design tutorial and boiler plate used and modified from PedroTech on YouTube
import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";

// Define the props type for CartItem
interface CartItemProps {
  data: {
    id: number;
    productName: string;
    price: number;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { id, productName, price} = data;

  // Define the ShopContext type
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = shopContext;

  return (
    <div className="cartItem">
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> Remove from Cart</button>
          <input
            type="number"
            value={cartItems[id] || 0}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> Add to Cart </button>
        </div>
      </div>
    </div>
  );
};
