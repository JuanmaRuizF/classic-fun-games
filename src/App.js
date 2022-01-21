
import './Styles/App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <p><Link to="/home">Home page</Link> </p>
      <p><Link to="/error">Error page</Link></p>
      <p><Link to="/connect_four">Connect Four</Link></p>
      <p><Link to="/memory_game">Memory Game</Link></p>
    </div>
  );
}

export default App;


