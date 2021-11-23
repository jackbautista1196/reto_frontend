
import './App.css';
import { Route } from 'wouter';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './pages/details';
function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} />
      <Route path='/detail/:id' component={Details} />
    </div>
  );
}

export default App;
