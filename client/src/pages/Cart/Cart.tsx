// Boiler plate code used from M18A26
import { /*Navigate,*/ useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { CartItem } from "./Cart-Item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
// import ThoughtList from '../../components/ThoughtList';

import { QUERY_USER, QUERY_ME, QUERY_EVENTS } from "../../utils/queries";

import Auth from "../../utils/auth";

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

    const [showPopup, setShowPopup] = useState(false);

     const handleCheckout = () => {
        setShowPopup(true);
        checkout()
      };
    
      const handleClosePopup = () => {
        // setShowPopup(false); // Close the popup
        navigate("/"); // Navigate back to homepage or another page
      };
    return (
      <div className="min-w-screen min-h-screen bg-zinc-900 py-5">
        <div className="px-5">
          <div className="mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Checkout
            </h1>
          </div>
        </div>
        <div className="w-full bg-zinc-900 border-t border-b border-gray-200 px-5 py-10 text-white">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                <div className="w-full mx-auto text-white font-light mb-6 border-b border-gray-200 pb-6">
                  {events.map((event: any) => {
                    if (cartItems[event.id] !== 0) {
                      return <CartItem key={event.id} data={event} />;
                    }
                  })}
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 text-white">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-white">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">${totalAmount}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-white">Taxes (USD)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">
                        ${(totalAmount * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-white text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-white">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">
                        ${(totalAmount * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                <div className="w-full mx-auto rounded-lg bg-zinc-700 border border-gray-200 p-3 text-white font-light mb-6">
                  <div className="w-full flex mb-3 items-center">
                    <div className="w-32">
                      <span className="text-white font-semibold">Contact</span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>{user.username}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-32">
                      <span className="text-white font-semibold">
                        Billing Address
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>123 George Street, Sydney, NSW 2000 Australia</span>
                    </div>
                  </div>
                </div>
                <div className="w-full mx-auto rounded-lg bg-zinc-700 border border-gray-200 text-white font-light mb-6">
                  <div className="w-full p-3 border-b border-gray-200">
                    <div className="mb-5">
                      <label
                        htmlFor="type1"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type1"
                          checked
                        />
                        <img
                          src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                          className="h-6 ml-3"
                        />
                      </label>
                    </div>
                    <div>
                      <div className="mb-3">
                        <label className="text-white font-semibold text-sm mb-2 ml-1">
                          Name on card
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors text-black"
                            placeholder="John Smith"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-white font-semibold text-sm mb-2 ml-1">
                          Card number
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors text-black"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/3">
                          <label className="text-white font-semibold text-sm mb-2 ml-1">
                            Expiration date
                          </label>
                          <div>
                            <select className="form-select w-full px-2 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer text-black">
                              <option value="01">01 - January</option>
                              <option value="02">02 - February</option>
                              <option value="03">03 - March</option>
                              <option value="04">04 - April</option>
                              <option value="05">05 - May</option>
                              <option value="06">06 - June</option>
                              <option value="07">07 - July</option>
                              <option value="08">08 - August</option>
                              <option value="09">09 - September</option>
                              <option value="10">10 - October</option>
                              <option value="11">11 - November</option>
                              <option value="12">12 - December</option>
                            </select>
                          </div>
                        </div>
                        <div className="px-2 w-1/4">
                          <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer text-black">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                          </select>
                        </div>
                        <div className="px-2 w-1/4">
                          <label className="text-white font-semibold text-sm mb-2 ml-1">
                            Security code
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="000"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-3">
                    <label
                      htmlFor="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                        width="80"
                        className="ml-3"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  {/* Conditional Rendering of Pay Now Button */}
                  {totalAmount > 0 ? (
                    <div>
                      <button
                        className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                        onClick=
                          {handleCheckout}
                        
                      >
                        <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                      </button>
                    </div>
                  ) : (
                    <h1>Your Shopping Cart is Empty</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-900 p-5 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Thank you for your purchase!</h2>
            <p className="mt-2">Your order has been successfully processed.</p>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={handleClosePopup}
            >
              CLOSE
            </button>
          </div>
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
        You need to be logged in to checkout. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
};

export default Cart;

  //   <div className="cart_head">

  //     <div>
  //       <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5 rounded-heading">
  //         Shopping Cart
  //       </h2>
  //     </div>
  //     <div className="cart_head">
  //   <div className="cart">
  //     {events.map((event:any) => {
  //       if (cartItems[event.id] !== 0) {
  //         return <CartItem key={event.id} data={event} />;
  //       }
  //     })}
  //   </div>

  //   {totalAmount > 0 ? (
  //     <div className="checkout">
  //       <p> Subtotal: ${totalAmount} </p>
  //       <button onClick={() => navigate("/")}> Continue Shopping </button>
  //       <button
  //         onClick={() => {
  //           checkout();
  //           navigate("/checkout");
  //         }}
  //       >
  //         {" "}
  //         Checkout{" "}
  //       </button>
  //     </div>
  //   ) : (
  //     <h1> Your Shopping Cart is Empty</h1>
  //   )}
  // </div>
  //     {!userParam && (
  //       <div
  //         className="col-12 col-md-10 mb-3 p-3"
  //         style={{ border: '1px dotted #1a1a1a' }}
  //       >

  //       </div>
  //     )}
  //   </div>
