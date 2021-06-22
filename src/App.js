// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Login from './containers/Login/login';
import Home from './containers/Home/home';
import Register from './containers/Register/register';
//IMPORT COMPONENTS
import Header from './components/Header/header';
// IMPORT STYLES
import './Global.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
