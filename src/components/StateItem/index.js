import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Chart from '../Chart'
import Graph from '../Graph'
import Footer from '../Footer'
import './index.css'

class StateItem extends Component {
  state = {
    stateData: {},
    isDataFetched: false,
    state: '',
    stateCasesData: {},
    chart: [],
    LineGraphData: [],
    cardHighlight: 'Confirmed',
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  getDataFromApi = async () => {
    const {match} = this.props
    const {params} = match
    const {key, stateName} = params

    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const indiaCovidCasesData = await response.json()
    const stateDataIndex = Object.keys(indiaCovidCasesData).filter(
      eachKey => eachKey === key,
    )

    const chartResponse = await fetch(
      'https://api.covid19india.org/v4/min/timeseries-AP.min.json',
    )
    const chartDataFromApi = await chartResponse.json()
    const data = indiaCovidCasesData[stateDataIndex]

    const Graphresponse = await fetch(
      `https://api.covid19india.org/v4/min/timeseries-${key}.min.json`,
    )
    const tsData = await Graphresponse.json()

    const GraphData = await Object.keys(tsData).map(
      eachData => tsData[eachData].dates,
    )

    const GraphTotalDataArray = Object.keys(GraphData[0]).map(date => [
      date,
      GraphData[0][date],
    ])

    const lastThreeMonthsData = GraphTotalDataArray.slice(
      GraphTotalDataArray.length - 90,
      GraphTotalDataArray.length,
    )

    const confirmedChartData = this.callOnConfirmedCases(chartDataFromApi)

    this.setState({
      stateData: data,
      isDataFetched: true,
      state: stateName,
      stateCasesData: chartDataFromApi,
      chart: confirmedChartData,
      LineGraphData: lastThreeMonthsData,
    })
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTotalCases = () => {
    const {stateData, cardHighlight} = this.state
    const confirmedHighlight =
      cardHighlight === 'Confirmed' ? 'confirmed-background' : ''
    const activeHighlight =
      cardHighlight === 'Active' ? 'active-background' : ''
    const recoveredHighlight =
      cardHighlight === 'Recovered' ? 'recovered-background' : ''
    const deceasedHighlight =
      cardHighlight === 'Deceased' ? 'deceased-background' : ''
    return (
      <div className="card-container" id="cardContainer">
        <button
          type="button"
          className={`confirmed card confirmed-button button ${confirmedHighlight}`}
          onClick={this.confirmedCardRender}
        >
          <p className="card-title">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Group_Tick_Mark_e6ywe0.png"
            alt="confirmed-log"
          />
          <p className="card-count">{stateData.total.confirmed}</p>
        </button>
        <button
          className={`tested card tested-button button ${activeHighlight}`}
          type="button"
          onClick={this.callOnActiveCases}
        >
          <p className="card-title">Active</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Active_iagatt.png"
            alt="active-log"
          />
          <p className="card-count">
            {stateData.total.confirmed - stateData.total.recovered}
          </p>
        </button>
        <button
          type="button"
          className={`recovered card recovered-button button ${recoveredHighlight}`}
          onClick={this.callOnRecoveredCases}
        >
          <p className="card-title">Recovered</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724714/CovidPAge/Recovered_yisgwk.png"
            alt="recovered"
            className="total-img"
          />
          <p className="card-count">{stateData.total.recovered}</p>
        </button>
        <button
          type="button"
          className={`deceased card deceased-button button ${deceasedHighlight}`}
          onClick={this.callOnDeceasedCases}
        >
          <p className="card-title">Deceased</p>
          <img
            src="https://res.cloudinary.com/dwfr5hva1/image/upload/v1625724651/CovidPAge/Deceased_mnzfxo.png"
            alt="deceased"
            className="total-img"
          />
          <p className="card-count">{stateData.total.deceased}</p>
        </button>
      </div>
    )
  }

  validData = value => (value === undefined ? 0 : value)

  renderTopDistricts = () => {
    const {stateData} = this.state
    const {districts} = stateData
    return (
      <>
        <h1 className="district-heading">Top Districts</h1>
        <ul className="top-districts-container">
          {Object.keys(districts).map(key => (
            <li className="districts-list-item" key={key}>
              <p className="district-count">
                {`${this.validData(districts[key].total.confirmed)}`}
              </p>
              <p className="district-name">{key}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  callOnConfirmedCases = stateCasesData => {
    const {AP} = stateCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.confirmed,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#9A0E31', lastTenDaysConfirmedCases]
    return chartData
  }

  confirmedCardRender = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP
    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.confirmed,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#9a0e31', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
      cardHighlight: 'Confirmed',
    })
  }

  callOnActiveCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP
    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.tested,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#0A4FA0', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
      cardHighlight: 'Active',
    })
  }

  callOnRecoveredCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.recovered,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#216837', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
      cardHighlight: 'Recovered',
    })
  }

  callOnDeceasedCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP
    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.deceased,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#474C57', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
      cardHighlight: 'Deceased',
    })
  }

  renderGraphsData = () => {
    const {LineGraphData} = this.state
    const spreadTreadsConfirmedCount = LineGraphData.map(
      eachItem => eachItem[1].total.confirmed,
    )
    const spreadTreadsActiveCount = LineGraphData.map(
      eachItem => eachItem[1].total.confirmed - eachItem[1].total.recovered,
    )
    const spreadTreadsRecoveredCount = LineGraphData.map(
      eachItem => eachItem[1].total.recovered,
    )
    const spreadTreadsDeceasedCount = LineGraphData.map(
      eachItem => eachItem[1].total.deceased,
    )
    const spreadTreadsVaccinatedCount = LineGraphData.map(
      eachItem => eachItem[1].total.vaccinated1,
    )
    const spreadTreadsTestedCount = LineGraphData.map(
      eachItem => eachItem[1].total.tested,
    )
    const testedPositiveRatio = LineGraphData.map(
      eachItem => eachItem[1].total.tested / eachItem[1].total.confirmed,
    )
    return (
      <>
        <Graph
          chartData={spreadTreadsConfirmedCount}
          chartHeading="Confirmed"
          chartColor="confirmed-heading"
          chartBgColor="confirmed-chart"
          color="#ff073a"
        />
        <Graph
          chartData={spreadTreadsActiveCount}
          chartHeading="Total Active"
          chartColor="active-heading"
          chartBgColor="active-chart"
          color="#007bff"
        />
        <Graph
          chartData={spreadTreadsRecoveredCount}
          chartHeading="Recovered"
          chartColor="recovered-heading"
          chartBgColor="recovered-chart"
          color="#27a243"
        />
        <Graph
          chartData={spreadTreadsDeceasedCount}
          chartHeading="Deceased"
          chartColor="deceased-heading"
          chartBgColor="deceased-chart"
          color="#6c757d"
        />
        <Graph
          chartData={spreadTreadsTestedCount}
          chartHeading="Tested"
          chartColor="tested-heading"
          chartBgColor="tested-chart"
          color="#9673b9"
        />
        <Graph
          chartData={spreadTreadsVaccinatedCount}
          chartHeading="Vaccine"
          chartColor="vaccine-heading"
          chartBgColor="vaccine-chart"
          color="#f95581"
        />
        <Graph
          chartData={testedPositiveRatio}
          chartHeading="Test Positively Ratio"
          chartColor="test-positively-ration-heading"
          chartBgColor="test-positively-ration-chart"
          color="#FD7E14"
        />
      </>
    )
  }

  renderStateDetails = () => {
    const {stateData, state, chart} = this.state
    const dateString = stateData.meta.last_updated
    const date = new Date(dateString)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return (
      <>
        <div className="state-name-container">
          <div className="state-name-update-details-card">
            <h1 className="state-name-heading">{state}</h1>
            <p className="last-date-text">{`Last updated date on ${
              months[date.getMonth()]
            } ${date.getDate()}th ${date.getFullYear()}.`}</p>
          </div>
          <div className="state-name-update-details-card">
            <p className="tested-text">Tested</p>
            <p className="tested-count">{stateData.total.tested}</p>
          </div>
        </div>
        {this.renderTotalCases()}
        {this.renderTopDistricts()}
        <Chart chart={chart} />
        <div className="spread-trend-container">
          <h1 className="spread-heading">Spread Trends</h1>
          <button type="button" className="spread-button">
            Cumulative
          </button>
          <button type="button" className="spread-button">
            Daily
          </button>
        </div>
        {this.renderGraphsData()}
        <Footer />
      </>
    )
  }

  render() {
    const {isDataFetched} = this.state
    return (
      <div className="state-page-container">
        {isDataFetched ? this.renderStateDetails() : this.renderSpinner()}
      </div>
    )
  }
}

export default StateItem
