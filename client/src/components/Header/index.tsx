import { Link } from 'react-router-dom';
import NavTabs from '../NavTabs/NavTabs';
import "./Header.css";

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className='header-item-1'>
          <Link className="text-light" to="/">
            <img className='logo-header' src="/logo-dark.png" alt="Description of the image"/>
          </Link>
          {/* <p className="m-0 slogan blinking-text">More Than Underground, It's a Movement.</p> */}
          </div>
        <div>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          
            <>
              <NavTabs/>
            </>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
