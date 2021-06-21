import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './containers/Login/login';
import Home from './containers/Home/home';
import './Global.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
