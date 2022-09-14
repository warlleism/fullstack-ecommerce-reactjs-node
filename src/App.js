import React from "react";
import Header from "./view/header/index";
import Provider from "./context/provider";

function App() {
  return (
    <div style={{ backgroundColor: "#180b41" }}>
      <Provider>
        <Header />
      </Provider>
    </div>
  );
}

export default App;
