import {Component} from 'react'

import {Link} from 'react-router-dom'
import './index.css'

class StatesList extends Component {
  state = {casesData: {}}

  componentDidMount() {
    this.getCasesData()
  }

  getCasesData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    this.setState({casesData: data})
  }

  returnStateName = index => {
    const {statesList} = this.props
    const state = statesList[index]
    if (state !== undefined) return state.state_name
    return ''
  }

  renderListElement = (stateData, key, index) => {
    const {total, meta} = stateData
    const {confirmed, deceased, recovered} = total
    const {population} = meta

    return (
      <Link to={`/${this.returnStateName(index)}/${key}`}>
        <div>
          <div className="list-items-s">
            <p className="states-name">{this.returnStateName(index)}</p>
            <p className="confirmed-cases">{confirmed}</p>
            <p className="active-cases">{confirmed - recovered}</p>
            <p className="recovered-cases">{recovered}</p>
            <p className="deceased-cases">{deceased}</p>
            <p className="population-count">{population}</p>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    const {casesData} = this.state

    return (
      <div className="state-list-container">
        <div className="states-list">
          <div className="list-header">
            <p>States/UT</p>
            <p>Confirmed</p>
            <p>Active</p>
            <p>Recovered</p>
            <p>Deceased</p>
            <p>Population</p>
          </div>
          <hr className="horizantal-line" />

          {Object.keys(casesData).map((eachState, index) => {
            const stateData = casesData[eachState]

            return this.renderListElement(stateData, eachState, index)
          })}
        </div>
      </div>
    )
  }
}

export default StatesList
