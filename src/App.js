import { useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';

const CELL_SIZE = 20;
const WIDTH = 2000;
const HEIGHT = 2000;

const rows = HEIGHT / CELL_SIZE;
const cols = WIDTH / CELL_SIZE;

function App() {
  useEffect(() => {
    window.scrollTo({top: HEIGHT/4, left: WIDTH/8, behavior: 'smooth'});
  }, []);

  return (
    <div className="App">
      <Grid
        cellSize={CELL_SIZE}
        width={WIDTH}
        height={HEIGHT}
        rows={rows}
        cols={cols}
      />
    </div>
  );
}

export default App;
