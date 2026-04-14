import { useParams, useNavigate } from "react-router-dom";

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Painel do Usuário</h2>

      <button className="btn btn-info w-100 mb-3"
        onClick={() => navigate(`/perfil/${id}`)}>
        Editar Perfil Médico
      </button>

      <button className="btn btn-danger w-100"
        onClick={() => navigate("/")}>
        Sair
      </button>
    </div>
  );
}

export default Dashboard;