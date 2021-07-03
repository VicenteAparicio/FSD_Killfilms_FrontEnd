// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Login from './containers/Login/login';
import Home from './containers/Home/home';
import Register from './containers/Register/register';
import Client from './containers/Client/client';
import Admin from './containers/Admin/admin';
import Watch from './containers/Watch/watch';
// IMPORT COMPONENTS
import Header from './components/Header/header';
import Moviedetail from './components/Moviedetail/moviedetail';
// IMPORT STYLES
import './Global.css';
import './App.scss';




function App() {
  return (
    <div className="containerApp">
    <BrowserRouter>
      <Header/>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/client" exact component={Client}/>
        <Route path="/admin" exact component={Admin}/>
        <Route path="/moviedetails" exact component={Moviedetail}/>
        <Route path="/watch" exact component={Watch}/>

      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
