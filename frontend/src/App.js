import { ToastContainer } from "react-toastify";

import NavBar from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <NavBar />

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthContextProvider>
  );
}

export default App;
