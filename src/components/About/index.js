import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class About extends Component {
  state = {aboutData: [], isLoading: true}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/website_data.json',
    )
    const data = await response.json()

    const {faq} = data

    this.setState({aboutData: faq, isLoading: false})
  }

  render() {
    const {aboutData, isLoading} = this.state
    return (
      <div className="about-background ">
        {isLoading ? (
          <div className="loader">
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="back">
            <h1 className="about-heading">About</h1>
            <p className="last-updated"> Last update on march 28th 2021.</p>
            <h2 className="vaccine-dist">
              COVID-19 vaccines be ready for distribution
            </h2>
            {aboutData.map(eachQn => {
              const {question, answer} = eachQn
              return (
                <>
                  <p className="question">{question}</p>
                  <p className="answer">{answer}</p>
                </>
              )
            })}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}
export default About
