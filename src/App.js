import './App.css';
import Grid from './components/Grid';

const CELL_SIZE = 20;
const WIDTH = 100;
const HEIGHT = 100;

const rows = HEIGHT / CELL_SIZE;
const cols = WIDTH / CELL_SIZE;

function App() {
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
