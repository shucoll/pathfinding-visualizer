import './App.css';

import Header from './components/Header/Header';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';

function App() {
  return (

    <div className="App">
      <Header/>
      <PathfindingVisualizer />
      <footer>Footer</footer>
    </div>
  );
}

export default App;
