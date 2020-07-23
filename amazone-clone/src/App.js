import React from 'react';
import './App.css';
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import Header from './Header';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <h1>Checkout</h1>
          </Route>

          <Route path="/login">
            <h1>Login</h1>
          </Route>

          <Route path="/">
            <Header/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
