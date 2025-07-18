import { BrowserRouter } from "react-router";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
