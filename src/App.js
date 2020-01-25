import React, { Suspense, useEffect } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import * as actions from "./features/containers/Auth"

import Layout from "./features/layout/layout"
import Home from "./features/containers/Home/components/home"
import Login from "./features/containers/Auth/components/login"
import Register from "./features/containers/Auth/components/register"
import Likes from "./features/containers/Likes/components/likes"
import Create from "./features/containers/Create/components/create"
import Logout from "./features/containers/Auth/components/logout"

import "./App.css"
import { connect } from "react-redux"

// Lazy imports containers
// const Login = React.lazy(() => {
//   return import("./features/containers/Auth/components/login")
// })
// const Register = React.lazy(() => {
//   return import("./features/containers/Auth/components/register")
// })
// const Likes = React.lazy(() => {
//   return import("./features/containers/Likes/components/likes")
// })
// const Create = React.lazy(() => {
//   return import("./features/containers/Create/components/create")
// })
// const Settings = React.lazy(() => {
//   return import("./features/containers/Settings/components/settings")
// })

const App = props => {
  const { onTryAutoSignup } = props

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  //No auth routes
  let routes = (
    <Switch>
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/logout" render={props => <Logout {...props} />} />
        <Route path="/likes" render={props => <Likes {...props} />} />
        <Route path="/create" render={props => <Create {...props} />} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
