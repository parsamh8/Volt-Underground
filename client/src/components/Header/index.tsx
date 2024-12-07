import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import NavTabs from '../NavTabs/NavTabs';
import "./Header.css";

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className='header-item-1'>
          <Link className="text-light" to="/">
            <h1 className="m-0">Volt Underground</h1>
          </Link>
          <p className="m-0">Every city has a night life to be discovered.</p>
        </div>
        <div className='header-item-2'>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavTabs/>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
