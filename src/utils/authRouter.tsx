import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from './auth'

const AuthRouter = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={(prop) => {
        if (isAuth) {
          return <>{children}</>
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: prop.location.pathname,
              },
            }}
          />
        )
      }}
    ></Route>
  )
}

export default AuthRouter
