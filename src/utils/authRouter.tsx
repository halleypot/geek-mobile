import store from '@/store'
import { ReactNode } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

const AuthRouter = ({ children, ...rest }: RouteProps) => {
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={() => {
        const { token } = store.getState().login
        if (token) {
          return children as ReactNode
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }}
    ></Route>
  )
}

export default AuthRouter
