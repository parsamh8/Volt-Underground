import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList/index.tsx';
import ThoughtForm from '../components/ThoughtForm/index.tsx';

import { QUERY_THOUGHTS } from '../utils/queries.ts';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
      <div className="homepage-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Boiler Room Video</h1>
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
                src="https://via.placeholder.com/600x400"
                alt="Featured Event"
                className="event-image"
              />
            </div>
            <div className="event-details">
              <h3>Techno Night: Underground Beats</h3>
              <p>Date: Dec 15, 2024</p>
              <p>Location: Vault Club, Downtown</p>
              <button className="buy-ticket-button">Buy Tickets</button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="event-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt={`Event ${index + 1}`}
                  className="event-image"
                />
                <h3>Event {index + 1}</h3>
                <p>Date: TBD</p>
                <Link to={'/session'}>
                  <button className="details-button">Details</button>
                </Link>
              </div>
            ))}
          </div>
        </section>
        {/* Past Events Section */}
        <section className="upcoming-events top-margin">
          <h2>Past Events</h2>
          <div className="events-grid">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="event-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt={`Event ${index + 1}`}
                  className="event-image"
                />
                <h3>Event {index + 1}</h3>
                <p>Date: TBD</p>
                <Link to={'/session'}>
                  <button className="details-button">Details</button>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Home;
