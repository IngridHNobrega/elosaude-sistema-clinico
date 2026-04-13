import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, senha });
      navigate(`/dashboard/${response.data.id}`);
    } catch {
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={logar}>
        <input type="email" required className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" required className="form-control mb-3"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;