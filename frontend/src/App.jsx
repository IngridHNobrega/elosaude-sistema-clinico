import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import PerfilEmergencia from "./pages/PerfilEmergencia";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/perfil/:id" element={<Perfil />} />
      <Route path="/perfil-emergencia/:id" element={<PerfilEmergencia />} />
    </Routes>
  );
}

export default App;