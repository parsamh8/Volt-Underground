import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/Shop-Context';

const Session = () => {
  const { eventId } = useParams<{ eventId: string }>(); // Get eventId from the URL
  const event_id = eventId ? parseInt(eventId) : NaN;

  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw new Error("ShopContext is not provided.");
  }

  const { addToCart } = shopContext;

  return (
    <div className="event-session Ticket">
      <div className="event-details">
        {/* Event Poster */}
        <div className="event-border"></div>

        {/* Event Description */}
        <div className="event-description">
          <h1>Event Title</h1>
          <p>Event Description</p>
        </div>
      </div>

      {/* Venue Information */}
      <div className="venue-info">
        <h2>Session Information</h2>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet...</p>
        <p><strong>Location:</strong> Event Venue</p>
        <p><strong>Date:</strong> Event Date</p>
        <p><strong>Time:</strong> Event Time</p>
        <p><strong>Ticket Link:</strong> <a href="#">Buy Tickets</a></p>
        <button className="session-ticket-button" onClick={() => addToCart(event_id)}>
          Add Ticket to Cart
        </button>
      </div>
    </div>
  );
};

export default Session;
