import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

if (module.hot) {
  module.hot.accept()
}