import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Neo Players</h1>
      <h3>Top Students List</h3>
      <Welcome name="Sara"/>
      <Welcome name="Chahal"/>
      <Welcome name="Phillips"/>
    </div>
  );
}

export default App;
