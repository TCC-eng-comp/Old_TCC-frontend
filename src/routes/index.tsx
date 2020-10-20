import React from 'react'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'
import Login from 'pages/Home/Login'
import Signup from 'pages/Home/Signup'
import Main from 'pages/Main'
import Profile from 'pages/Profile'

import { AnimatePresence } from 'framer-motion'
import Logged from 'hoc/Logged'
import PrivateRoute from 'hoc/PrivateRoute'
import { Route, Switch, useLocation } from 'react-router-dom'

const Routes: React.FC = () => {
  const location = useLocation()

  const homeRoutes = [
    { path: '/', exact: true, slider: () => <Login />, restOfHome: () => <Home /> },
    { path: '/signup', slider: () => <Signup />, restOfHome: () => <Home /> },
  ]

  return (
    <Logged>
      <AnimatePresence initial={false}>
        <Switch location={location} key={location.pathname}>
          {homeRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              children={() => (
                <>
                  <route.slider />
                  <route.restOfHome />
                </>
              )}
            />
          ))}
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password' component={ConfirmPassword} />

          <PrivateRoute>
            <Route path='/main' component={Main} />
            <Route path='/profile' component={Profile} />
          </PrivateRoute>
        </Switch>
      </AnimatePresence>
    </Logged>
  )
}

export default Routes
