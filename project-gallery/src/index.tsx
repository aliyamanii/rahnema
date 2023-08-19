import React from "react";
import ReactDOM from "react-dom/client";
import Gallery from "./Gallery";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>
);
reportWebVitals();
