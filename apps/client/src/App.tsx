import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
