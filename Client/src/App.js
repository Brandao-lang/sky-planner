import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import signSuccess from './components/signSuccess';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/success' component={signSuccess}/>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
