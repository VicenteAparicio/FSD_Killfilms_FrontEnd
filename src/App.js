// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Login from './containers/Login/login';
import Home from './containers/Home/home';
import Register from './containers/Register/register';
import Profile from './containers/Profile/profile';
import Header from './components/Header/header';
// IMPORT COMPONENTS

// IMPORT STYLES
import './Global.css';
import './App.scss';


function App() {
  return (
    
    <BrowserRouter>
      <Header/>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/profile" exact component={Profile}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
