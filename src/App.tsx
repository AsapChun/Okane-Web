import './App.css';
import { Route, Switch, Redirect, RouteProps} from "react-router-dom";
import Login from './components/AccountEvents/Login';
import Onboarding from './components/Onboarding/Onboarding';
import Settings from './components/Settings/Settings';
import auth from './models/auth';
import { useState } from 'react';
import DashboardRedesign from './components/Dashboard/DashboardRedesign';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  const [isAuth, setIsAuth] = useState(auth.isAuthenticated())

  const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
    console.log("isAuthenticated: " + auth.isAuthenticated())
    setIsAuth(auth.isAuthenticated()) 
    if (!isAuth) {
      return <Redirect to="/login" />;
    }
  
    return <Route component={Component} path={path} />;
  };

  const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
    console.log("isAuthenticated: " + auth.isAuthenticated())
    setIsAuth(auth.isAuthenticated())
    if (isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return <Route component={Component} path={path} /> 
  };

  return(
    <div className="wrapper">
      <Switch>
        <RouteUnauthenticated path="/login" component={() => <Login setIsAuth={setIsAuth}/>}/>
        <RouteAuthenticated path="/xyzxyzxyz" component={() => <Dashboard setIsAuth={setIsAuth}/>}/>
        <RouteAuthenticated path="/settings" component={() => <Settings setIsAuth={setIsAuth}/>} />
        <RouteAuthenticated path="/onboarding" component={Onboarding} /> 
        <RouteAuthenticated path="/dashboard" component={() => <DashboardRedesign setIsAuth={setIsAuth}/>}/>
        <Route render={() => window.location.href="https://okane-app.crd.co/"}/>
      </Switch>
    </div>
  )
}


export default App;
