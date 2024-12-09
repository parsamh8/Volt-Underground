import { Link } from 'react-router-dom';
import { ShopContext } from "../context/Shop-Context";
import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading: _eventsLoading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const featuredEvent = events[0];

  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided.")
  }

  if (_eventsLoading) {
    return <div>Loading...</div>; // You can customize the loading state here
  }

  return (
    <main>
      <div className="homepage-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Present Underground Sessions</h1>
            <p>Where beats meet the night. Discover the ultimate techno-house experience.</p>
            <button className="cta-button">Explore Events</button>
          </div>
        </div>

        {/* Featured Event Section */}
        <section className="featured-event">
          <h2>Featured Event</h2>
          <div className="event-container">
            <div className="event-image-wrapper">
              <img
                src={featuredEvent.posterUrl || "https://via.placeholder.com/600x400"}
                alt={featuredEvent || "Featured Event"}
                className="event-image"
              />
            </div>
            <div className="event-details p-ft">
              <h4 className='fr-margin'>{featuredEvent.title}</h4>
              <p>Date: {featuredEvent.date}</p>
              <p>Location: {featuredEvent.venue}</p>
              <p>Price: {featuredEvent.price}</p>
              {/* <p>Ticket Link: {featuredEvent.ticketLink}</p> */}
              <Link to={`/session/${events[0].id}`}>
                    <button className="details-button">Details</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {events.length > 0 ? (
              events.slice(0, 3).map((event:any, index:any) => (
                <div key={index} className="event-card">
                  <img
                    src={event.posterUrl || "https://via.placeholder.com/300x200"} // Add fallback if ticketLink is missing
                    alt={`Event ${event.id}`}
                    className="event-image"
                  />
                  <h3>{event.title || `Event ${event.id}`}</h3>
                  <p>Date: {event.date || "TBD"}</p>
                  <Link to={`/session/${event.id}`}>
                    <button className="details-button">Details</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </div>
        </section>

        {/* Past Events Section */}
        <section className="past-events top-margin">
          <h2>Past Events</h2>
          <div className="events-grid">
            {events.length > 0 ? (
              events.slice(3, 6).map((event:any, index:any) => (
                <div key={index} className="event-card">
                  <img
                    src={event.posterUrl || "https://via.placeholder.com/300x200"} // Add fallback
                    alt={`Event ${event.id}`}
                    className="event-image"
                  />
                  <h3>{event.title || `Event ${event.id}`}</h3>
                  <p>Date: {event.date || "TBD"}</p>
                  <Link to={`/session/${event.id}`}>
                    <button className="details-button">Details</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No past events available.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Home;
