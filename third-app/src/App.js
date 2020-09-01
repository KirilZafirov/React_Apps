import React , { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

import './App.css';

const  App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
   
  return (
    <div className="App">
      <h1> App</h1>
    </div>
  );
}

export default App;
