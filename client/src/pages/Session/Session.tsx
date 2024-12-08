import './index.css'

interface Class {
  posterUrl: string,
  title: string,
  description: string,
  venue: string,
  date: string,
  time: string,
  ticketLink: string
}

const Session = ({ posterUrl, title, description, venue, date, time, ticketLink }: Class) => {
  return (
    <div className="event-session Ticket">
      <div className="event-details">
        {/* Event Poster */}
        <div className="event-border">
        </div>

        {/* Event Description */}
        <div className="event-description">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {/* Separator Line */}
      <div className="separator"></div>
        <div className='session-img'>

        </div>

      {/* Venue Information */}
      <div className="venue-info">
        <h2>Session Information</h2>
        <p><strong>Description:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequatur temporibus ducimus eligendi voluptatibus porro. Doloribus repellat architecto incidunt ullam eaque enim velit laudantium, tempora earum! Dolor eaque cum deleniti?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, soluta ratione quisquam officia amet voluptate exercitationem velit impedit similique sit perspiciatis nobis iusto, earum voluptatum perferendis. Fugit harum a dolores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsa a cupiditate doloribus, aspernatur fuga beatae voluptates deserunt illum unde. Repudiandae, nisi. Ipsam illum saepe alias tempora, nostrum nobis aut? {description}</p>
        <p><strong>Location:</strong> {venue}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <div className='session-img'>
          <img src={'/src/assets/logo-light.png'}/>
        </div>
        <button className="session-ticket-button" onClick={() => window.open(ticketLink, '_blank')}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default Session;
