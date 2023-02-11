import './App.css';
import Card from './components/Card';
import DevTools from './components/DevTools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <DevTools />
          <div className="body">
              <Routes>
                <Route path="/player/:username" element={<Card />} />
              </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
