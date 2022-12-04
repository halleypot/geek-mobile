import './App.scss'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/layout'
import Login from './pages/login'
import Test from './pages/test'
import { customHistory } from '@/utils/history'

function App() {
  return (
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/test'} component={Test} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
