const Session = ({ posterUrl, title, description, venue, date, time, ticketLink }) => {
  return (
    <div className="event-session">
      <div className="event-details">
        {/* Event Poster */}
        <div className="event-poster">
          <img src={posterUrl} alt={`${title} Poster`} />
        </div>

        {/* Event Description */}
        <div className="event-description">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {/* Separator Line */}
      <div className="separator"></div>

      {/* Venue Information */}
      <div className="venue-info">
        <h2>Venue Information</h2>
        <p><strong>Location:</strong> {venue}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <button className="buy-ticket-button" onClick={() => window.open(ticketLink, '_blank')}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default Session;
