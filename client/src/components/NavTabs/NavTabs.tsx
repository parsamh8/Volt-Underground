import "./NavTabs.css";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";

function NavTabs() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const logout = (event: any) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close the menu on nav item click
  const closeMenuAndNavigate = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-light bg-light bg-light-nav">
      <div className="d-flex justify-content-between w-100">
        {!isMenuOpen && (
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
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
        ref={menuRef}
      >
        <div className="navbar-header">
          <button
            className="close-button"
            type="button"
            aria-label="Close navigation"
            onClick={toggleMenu}
          >
            ×
          </button>
        </div>
        <div>
          <ul className="nav flex-column">
            <NavLink className="nav-item" to="/" onClick={closeMenuAndNavigate}>
              <li className="nav-link">Home</li>
            </NavLink>

            {Auth.loggedIn() ? (
              <>
                <NavLink
                  className="nav-item"
                  to="/me"
                  onClick={closeMenuAndNavigate}
                >
                  <div className="nav-link">View Profile</div>
                </NavLink>
                <NavLink
                  className="nav-item"
                  to="/cart"
                  onClick={closeMenuAndNavigate}
                >
                  <li className="nav-link">Cart</li>
                </NavLink>
                <div className="nav-item">
                  <button
                    className="nav-link"
                    onClick={(e) => {
                      logout(e);
                      closeMenuAndNavigate();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  className="nav-item"
                  to="/signup"
                  onClick={closeMenuAndNavigate}
                >
                  <li className="nav-link">Sign Up</li>
                </NavLink>
                <NavLink
                  className="nav-item"
                  to="/login"
                  onClick={closeMenuAndNavigate}
                >
                  <li className="nav-link">Login</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div
        className={`overlay ${isMenuOpen ? "visible" : ""}`}
        onClick={toggleMenu}
      ></div>
    </nav>
  );
}

export default NavTabs;
