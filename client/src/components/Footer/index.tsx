import { useLocation, useNavigate, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if(window.history.length > 1) { //Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={handleGoBack}
          >
            &larr; Go Back
          </button>
        )}
        <h6 className='top-margin'>
        &copy; 2024 <Link className="text-light" to="/"><span className='logo'>Volt Underground</span></Link>. All rights reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
