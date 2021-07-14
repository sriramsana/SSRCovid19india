import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1626074136/NotFound_s6u3nj.png"
      alt="notFound"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-description">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
