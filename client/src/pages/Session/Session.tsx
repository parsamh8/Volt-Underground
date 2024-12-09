import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth'; // Update with the correct path
import { ShopContext } from '../../context/Shop-Context';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import './index.css';

const Session = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event_id = eventId ? parseInt(eventId) : NaN;
  const navigate = useNavigate(); // Use the hook here
  const shopContext = useContext(ShopContext);
  const { loading: _eventsLoading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  if (!shopContext) {
    throw new Error('ShopContext is not provided.');
  }
  const { addToCart } = shopContext;

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [navigate]);

  const addTicket = (event_id: any) => {
    addToCart(event_id);
    navigate('/cart'); // Navigate to cart after adding a ticket
  };

  return (
    <div className="event-session Ticket">
      <div className="event-details">
        {/* Event Poster */}
        <div className="event-border"></div>

        {/* Event Description */}
        <div className="event-description">
          <h1>{events[event_id-1].title}</h1>
          <p>Event Description</p>
        </div>
      </div>

      {/* Venue Information */}
      <div className="venue-info">
        <h2>Session Information</h2>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet...</p>
        <p><strong>Location:</strong> {events[event_id-1].venue} </p>
        <p><strong>Date:</strong> {events[event_id-1].date} </p>
        <p><strong>Time:</strong> {events[event_id-1].time} </p>
        <p><strong>Price:</strong> {events[event_id-1].price}</p>
        <button className="session-ticket-button" onClick={() => addTicket(event_id)}>
          Add Ticket to Cart
        </button>
      </div>
    </div>
  );
};

export default Session;
