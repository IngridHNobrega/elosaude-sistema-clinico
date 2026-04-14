import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function PerfilEmergencia() {
  const { id } = useParams();
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  const acessarFicha = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/ficha-publica/${id}`, { senhaDigitada });
      setDados(response.data);
      setErro("");
    } catch (err) {
      setErro("Senha incorreta ou ficha não encontrada.");
    }
  };

  if (dados) {
    return (
      <div className="container mt-5">
        <div className="card border-danger mb-3">
          <div className="card-header bg-danger text-white">
            <h3 className="mb-0">Ficha de Emergência</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">{dados.nome} {dados.sobrenome}</h5>
            <p><strong>Tipo Sanguíneo:</strong> {dados.tipoSanguineo}</p>
            <p><strong>Contato de Emergência:</strong> {dados.contatoEmergencia}</p>
            {/* O SEU TRECHO DE CÓDIGO AQUI: */}
            <p style={{color:"red", fontWeight:"bold"}}>
              Alergias: {dados.alergias || "Nenhuma registrada"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Acesso de Emergência</h2>
      <p>Digite a senha pública do paciente para acessar a ficha médica.</p>
      <form onSubmit={acessarFicha}>
        <input type="password" required className="form-control mb-3"
          placeholder="Senha Pública (Números)"
          onChange={(e) => setSenhaDigitada(e.target.value)}
        />
        <button className="btn btn-danger w-100">Acessar Ficha</button>
      </form>
      {erro && <p className="text-danger mt-3">{erro}</p>}
    </div>
  );
}

export default PerfilEmergencia;