import React from "react";
import Provider from "./context/provider";
import Rotas from "./routes";
import './index.css'

function App() {
  
  return (
    <div style={{ backgroundColor: "#180b41" }}>
      <Provider>
        <Rotas />
      </Provider>
    </div>
  );
}

export default App;
