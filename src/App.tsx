import './App.scss'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/layout'
import Login from './pages/login'
import Test from './pages/test'
import ProfileEdit from './pages/profile/edit'
import { customHistory } from '@/utils/history'
import AuthRouter from './utils/authRouter'

function App() {
  return (
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/test'} component={Test} />
          {/* <Route path={'/profile/edit'} component={ProfileEdit} /> */}
          <AuthRouter path="/profile/edit">
            <ProfileEdit />
          </AuthRouter>
        </Switch>
      </div>
    </Router>
  )
}

export default App
