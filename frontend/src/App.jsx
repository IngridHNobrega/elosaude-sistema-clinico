import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const realizarCadastro = async (e) => {
    e.preventDefault();
    try {
      // Tenta enviar para o seu backend
      const response = await axios.post('http://localhost:3000/cadastro', { email, senha });
      setMensagem("✅ Sucesso! Conta criada.");
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100" style={{backgroundColor: '#E5F1F4'}}>
      <div className="card shadow p-4" style={{width: '350px', borderRadius: '15px', border: 'none'}}>
        <div className="text-center mb-4">
          <div className="bg-info d-inline-block rounded-circle p-3 mb-2" style={{backgroundColor: '#2D87A4 !important'}}>
            <h4 className="text-white m-0 fw-bold">ELO</h4>
          </div>
          <h3 className="fw-bold" style={{color: '#2D87A4'}}>CADASTRO</h3>
        </div>

        <form onSubmit={realizarCadastro}>
          <input type="email" className="form-control mb-3" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="senha" className="form-control mb-3" placeholder="Senha" required onChange={(e) => setSenha(e.target.value)} />
          <input type="password" name="confirmar" className="form-control mb-4" placeholder="Confirmar Senha" required />
          
          <button type="submit" className="btn btn-info w-100 text-white fw-bold py-2" style={{backgroundColor: '#2D87A4', border: 'none'}}>
            CRIAR MEU CADASTRO
          </button>
        </form>
        {mensagem && <p className="mt-3 text-center small fw-bold">{mensagem}</p>}
      </div>
    </div>
  );
}

export default App;