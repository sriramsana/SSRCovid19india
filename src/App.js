import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Homepage from './components/Homepage'
import Header from './components/Header'
import About from './components/About'
import StateItem from './components/StateItem'
import NotFound from './components/NotFound'

const App = () => (
  <div>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:stateName/:key" component={StateItem} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
