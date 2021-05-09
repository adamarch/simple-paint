import React        from 'react';
import { Canvas }   from './components/Canvas';
import { Toolbar }  from './components/Toolbar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
