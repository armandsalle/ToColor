import React, { Suspense } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"

import Layout from "./features/layout/layout"

import "./App.css"

// Lazy imports containers
const Home = React.lazy(() => {
  return import("./features/containers/Home/components/home")
})
const Login = React.lazy(() => {
  return import("./features/containers/Auth/login")
})

const App = () => {
  //No auth routes
  const routes = (
    <Switch>
      <Route path="/auth" render={props => <Login {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  )
}

export default withRouter(App)
