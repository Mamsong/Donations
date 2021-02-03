import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import 'rsuite/dist/styles/rsuite-default.css'
import "react-datepicker/dist/react-datepicker.css";

import Inputs from './components/Inputs';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Donation_list from './components/Donation_list';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/inputs">
          <Inputs />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/donation_list">
          <Donation_list />
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

if (module.hot) {
  module.hot.accept()
}
