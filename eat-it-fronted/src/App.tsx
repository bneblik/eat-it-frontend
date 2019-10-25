import React from 'react';
import './App.css';
import { Meals } from './components/Meals';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/meals" component={Meals} />
      </div>
    </Router>
  );
}

export default App;
