import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Perfil() {
  const { id } = useParams();

  const [dados, setDados] = useState({
    nome: "",
    sobrenome: "",
    sexo: "",
    tipoSanguineo: "",
    contatoEmergencia: "",
    alergias: "",
    medicamentos: "",
    doencas: "",
    cirurgias: "",
    senhaPublica: ""
  });

  const salvar = async () => {
    if (!/^\d+$/.test(dados.senhaPublica)) {
      return alert("Senha pública deve conter apenas números.");
    }

    await api.put(`/perfil/${id}`, dados);
    alert("Perfil salvo com sucesso!");
  };

  return (
    <div className="container mt-5">
      <h2>Perfil Médico</h2>

      <input className="form-control mb-2" placeholder="Nome"
        onChange={(e) => setDados({...dados, nome: e.target.value})} />

      <select className="form-control mb-2"
        onChange={(e) => setDados({...dados, tipoSanguineo: e.target.value})}>
        <option value="">Tipo Sanguíneo</option>
        <option>A+</option>
        <option>A-</option>
        <option>O+</option>
        <option>O-</option>
      </select>

      <textarea className="form-control mb-2"
        placeholder="Alergias"
        onChange={(e) => setDados({...dados, alergias: e.target.value})} />

      <input type="password" className="form-control mb-3"
        placeholder="Senha Pública (somente números)"
        onChange={(e) => setDados({...dados, senhaPublica: e.target.value})}
      />

      <button className="btn btn-success w-100" onClick={salvar}>
        Salvar Perfil
      </button>
    </div>
  );
}

export default Perfil;