import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HistoryPage from "./pages/history";
import HomePage from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />

          <Route path={`/home`} element={<HomePage />}>
            <Route path=":usernameparam" element={<HomePage />} />
          </Route>

          <Route path="history" element={<HistoryPage />} />
          <Route path="*" element={""} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
