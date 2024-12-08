// Boiler plate code used from M18A26
import { /*Navigate,*/ useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { CartItem } from "./Cart-Item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import ThoughtForm from '../../components/ThoughtForm';
// import ThoughtList from '../../components/ThoughtList';

import { QUERY_USER, QUERY_ME, QUERY_EVENTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const Cart = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: _eventsLoading, data: eventsData } = useQuery(QUERY_EVENTS);

  const user = data?.me || data?.user || {};
  const events = eventsData?.events || [];
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() /*&& Auth.getProfile().data.username === userParam*/) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

    return (
      <div className="cart_head">

        <div>
          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Shopping Cart
          </h2>
        </div>
        <div className="cart_head">
      <div className="cart">
        {events.map((event:any) => {
          if (cartItems[event.id] !== 0) {
            return <CartItem data={event} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to checkout. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
};

export default Cart;
