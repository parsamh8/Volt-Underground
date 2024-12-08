import "./NavTabs.css";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";

function NavTabs() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Explicitly type useState
  const menuRef = useRef<HTMLDivElement | null>(null); // Ref type for a div element

  const logout = (event: any) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };

  // Toggles the side navbar
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Handles clicks outside the menu
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false); // Close the menu if the click is outside of it
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-light bg-light bg-light-nav custom-dark-green">
      <div className="d-flex justify-content-between w-100">
        {!isMenuOpen && (
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleMenu} // Attach toggle menu to navbar toggler button
          >
            <img
              className="navbar-button-icon"
              src="https://img.icons8.com/?size=100&id=120374&format=png&color=FFFFFF"
              alt="Toggle Menu"
            />
          </button>
        )}
      </div>
      <div
        className={`navbar-collapse ${isMenuOpen ? "show" : ""}`}
        id="navbarNav"
        ref={menuRef} // Attach the ref here
      >
        <button
          className="close-button"
          type="button"
          aria-label="Close navigation"
          onClick={toggleMenu} // Toggle menu also is called on close button click
        >
          ×
        </button>
        {/* Return navbar links with client-side routing */}
        <ul className="nav flex-column">
          <NavLink className="nav-item" to="/">
            <li className="nav-link">Home</li>
          </NavLink>

          {Auth.loggedIn() ? (
            <>
              <NavLink className="nav-item" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                <div className="nav-link">View Profile</div>
              </NavLink>
              <NavLink className="nav-item" to="/profiles/cart">
                <li className="nav-link">Cart</li>
              </NavLink>
              <div className="nav-item">
                <button className="nav-link" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink className="nav-item" to="/signup">
                <li className="nav-link">Sign Up</li>
              </NavLink>
              <NavLink className="nav-item" to="/login">
                <li className="nav-link">Login</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavTabs;
