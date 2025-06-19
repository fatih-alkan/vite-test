import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';
import './App.css'
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}
