import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Error404 from "./pages/Error404";
import Navbar1 from "./components/Navbar1";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <AuthProvider>
          <Navbar1 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/new" element={<NewTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
