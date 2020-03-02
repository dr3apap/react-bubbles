import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <div className='App'>
      <>
        <Link to='/'>Login</Link>
        <Link to='/protected'>BubblePage</Link>
      </>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/protected' component={BubblePage} />

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <Route Component={Login} />
      </Switch>
    </div>
  );
}

export default App;
