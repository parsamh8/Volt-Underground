import './index.css'
import { ShopContext } from "../../context/Shop-Context";
import { useContext } from 'react';
// interface Class {
//   posterUrl: string,
//   id: number,
//   title: string,
//   description: string,
//   venue: string,
//   date: string,
//   time: string,
//   ticketLink: string
// }

const Session = ({id=1, title='abc', description='cab', venue='abc', date='abc', time='abc', ticketLink='abc' }) => {
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { addToCart } = shopContext;
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
        <p><strong>Ticket Link:</strong> {ticketLink}</p>
        <div className='session-img'>
          <img src={'/src/assets/logo-light.png'}/>
        </div>
        <button className="session-ticket-button" onClick={() => addToCart(id)}>
          Add Ticket to Cart
        </button>
      </div>
    </div>
  );
};

export default Session;
