import { Route, Switch } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path='/privacy'>
          <Privacy />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
