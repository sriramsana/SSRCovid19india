import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    optionButtonStatus: false,
  }

  renderOptions = () => {
    this.setState({optionButtonStatus: true})
  }

  closeOptions = () => {
    this.setState({optionButtonStatus: false})
  }

  render() {
    const {optionButtonStatus} = this.state
    return (
      <>
        <nav className="nav_bar">
          <Link to="/">
            <h1 className="covid19-heading">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1626101672/CovidPAge/add-to-queue_roafbc.png"
            alt="menu"
            className="menu-button"
            onClick={this.renderOptions}
          />

          <ul className="nav-options">
            <Link to="/">
              <li className="home-link">Home</li>
            </Link>
            <Link to="/about">
              <li className="about-link">About</li>
            </Link>
          </ul>
        </nav>
        {optionButtonStatus && (
          <div className="mobile-nav-options-container">
            <ul className="mobile-nav-options">
              <Link to="/">
                <li className="home-link">Home</li>
              </Link>
              <Link to="/about">
                <li className="about-link">About</li>
              </Link>
            </ul>
            <img
              src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1626101722/CovidPAge/Shape_ncl4vb.png"
              alt="cross"
              className="cross"
              onClick={this.closeOptions}
            />
          </div>
        )}
      </>
    )
  }
}
export default Header
