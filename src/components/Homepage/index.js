import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'

import './index.css'
import StatesList from '../StatesList'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Homepage extends Component {
  state = {isLoading: true, totalCases: [], suggestion: []}

  componentDidMount() {
    this.getCasesData()
  }

  getCasesData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()
    const {TT} = data
    delete data.TT

    this.setState({totalCases: TT, isLoading: false})
  }

  getTotalCases = () => {
    const {totalCases} = this.state

    return (
      <div className="total-container">
        <div className="confirmed">
          <p>Confirmed</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Group_Tick_Mark_e6ywe0.png"
            alt="confirmed"
            className="total-img"
          />
          <p>{totalCases.total.confirmed}</p>
        </div>
        <div className="active">
          <p>Active</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Active_iagatt.png"
            alt="active"
            className="total-img"
          />
          <p>{totalCases.total.confirmed - totalCases.total.recovered}</p>
        </div>
        <div className="recovered">
          <p>Recovered</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724714/CovidPAge/Recovered_yisgwk.png"
            alt="recovered"
            className="total-img"
          />
          <p>{totalCases.total.recovered}</p>
        </div>
        <div className="deceased">
          <p>Deceased</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Deceased_mnzfxo.png"
            alt="deceased"
            className="total-img"
          />
          <p>{totalCases.total.deceased}</p>
        </div>
      </div>
    )
  }

  onChangeSearchInput = event => {
    const userSearch = event.target.value

    const searchResults = statesList.filter(eachSuggestion =>
      eachSuggestion.state_name
        .toLowerCase()
        .includes(userSearch.toLowerCase()),
    )
    console.log(searchResults)
    this.setState({
      suggestion: searchResults,
    })
  }

  renderSearchSuggestions = () => {
    const {suggestion} = this.state
    return (
      <ul id="suggestionContainer" className="suggestion-list-container">
        {suggestion.map(eachState => (
          <Link
            className="link-item"
            to={`/${eachState.state_name}/${eachState.state_code}`}
            key={eachState.state_code}
          >
            <li className="suggestion-item" onClick={this.renderInputValue}>
              <p className="state-name">{eachState.state_name}</p>
              <div className="each-state-code-container">
                <p className="state-code">{eachState.state_code}</p>
                <img
                  src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1626108986/CovidPAge/Line_jabicn.png"
                  alt="arrow-icon"
                />{' '}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div className="loader">
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="background">
            <div className="search-results">
              <div className="search-container">
                <img
                  src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625676684/CovidPAge/search_spmzhf.png"
                  alt="search"
                />
                <input
                  placeholder="Enter the State"
                  className="input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
              {this.renderSearchSuggestions()}
            </div>
            {this.getTotalCases()}
            <div className="state-list-container">
              <StatesList statesList={statesList} />
            </div>
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default Homepage
