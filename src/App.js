
import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';
function App() {
  return (
    <Router>
    <div className="App">
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route path='/signup' component={SignUp} />
    </div>
    </Router>
   
  );
}

export default App;
