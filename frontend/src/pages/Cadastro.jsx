import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // CAMINHO CORRIGIDO

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/cadastro", { email, senha });
      setQrCode(response.data.qrCode);
      alert("Conta criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      <form onSubmit={cadastrar}>
        <input type="email" required className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" required className="form-control mb-3"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="btn btn-primary w-100">Criar Conta</button>
      </form>

      {qrCode && (
        <div className="mt-4 text-center">
          <img src={qrCode} width="200" alt="QR Code Perfil" />
          <br />
          <a href={qrCode} download="qrcode.png" className="btn btn-success mt-3">
            Download QR Code
          </a>
        </div>
      )}

      <p className="mt-3">
        Já tem conta? <span onClick={() => navigate("/login")} style={{cursor:"pointer", color:"blue", textDecoration: "underline"}}>Login</span>
      </p>
    </div>
  );
}

export default Cadastro;