import { Link } from 'react-router-dom';
import NavTabs from '../NavTabs/NavTabs';
import "./Header.css";

const Header = () => {
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
          
            <>
              <NavTabs/>
            </>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
