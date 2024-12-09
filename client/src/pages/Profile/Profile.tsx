import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./Profile.css";

// Queries
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

interface PurchaseHistoryCardProps {
  ticketId: string;
  event: string;
  date: string;
  location: string;
  imageUrl?: string; // Optional image URL
}

const PurchaseHistoryCard: React.FC<PurchaseHistoryCardProps> = ({
  ticketId,
  event,
  date,
  location,
  imageUrl = "https://via.placeholder.com/150",
}) => (
  <div className="card">
    {/* Conditionally render the image if imageUrl is provided */}
    {imageUrl && <img src={imageUrl} alt={event} className="card-image" />}

    <h5 className="card-title">{`Ticket #${ticketId}`}</h5>
    <p>{`Event: ${event}`}</p>
    <p>{`Date: ${date}`}</p>
    <p>{`Location: ${location}`}</p>
    <button className="card-button">View Details</button>
  </div>
);

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const purchaseHistory = [
    {
      ticketId: "12345",
      event: "Underground Beats",
      date: "Dec 15, 2024",
      location: "The Hidden Venue",
      
    },
    {
      ticketId: "12346",
      event: "Bassline Madness",
      date: "Jan 10, 2025",
      location: "Subterranean Club",
      
    },
    {
      ticketId: "12347",
      event: "Gothic Groove Night",
      date: "Feb 20, 2025",
      location: "Warehouse 99",
      
    },
  ];

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 2560 100"
          >
            <polygon
              className="text-zinc-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-zinc-800 w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="Profile"
                      src="/src/assets/logo-dark.png"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                {user.username}
              </h3>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-2xl leading-relaxed text-white">
                    PURCHASE HISTORY
                    <div className="card-container">
                      {purchaseHistory.map((purchase) => (
                        <PurchaseHistoryCard
                          key={purchase.ticketId}
                          {...purchase}
                        />
                      ))}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
