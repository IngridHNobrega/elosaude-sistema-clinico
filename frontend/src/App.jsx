import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [qrCode, setQrCode] = useState('');

  const realizarCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/cadastro', {
        email,
        senha
      });

      setMensagem("✅ Conta criada com sucesso!");
      setQrCode(response.data.qrCode);

    } catch (error) {
      setMensagem("❌ Erro ao criar conta.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Cadastro</h3>

        <form onSubmit={realizarCadastro}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Criar Conta
          </button>
        </form>

        {mensagem && <p className="mt-3 text-center">{mensagem}</p>}

        {qrCode && (
          <div className="text-center mt-4">
            <h5>Seu QR Code:</h5>
            <img src={qrCode} alt="QR Code" style={{ width: '200px' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;