import {Component} from 'react'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h1 className="covid19-footer-heading">
          COVID19<span className="india">INDIA</span>
        </h1>
        <p className="footer-para">
          we stand with everyone fighting on the front lines
        </p>
        <div className="social-icons">
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625752440/CovidPAge/GitHub_icon_nzrzlr.png"
            alt="github"
          />
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625752453/CovidPAge/instagram_logo_fteepm.png"
            alt="instagram"
          />
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625752453/CovidPAge/twitter_logo_pu2cpb.png"
            alt="twitter"
          />
        </div>
      </div>
    )
  }
}
export default Footer
