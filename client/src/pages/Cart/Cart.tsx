// Cart design tutorial used and modified from PedroTech on YouTube
import { /*Navigate,*/ useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../../components/ThoughtForm';
import ThoughtList from '../../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';


import { EVENTS } from '../../Events';

const Cart = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() /*&& Auth.getProfile().data.username === userParam*/) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return (
      <div className="cart">

        <div>
          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Shopping Cart
          </h2>
        </div>
        <div className="cart-items">
          {EVENTS.map((Event)=> {

          })}
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
