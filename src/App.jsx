import { useState } from 'react';
import './App.css';
import API_URL from './services/api'; // ✅ variável de ambiente

function App() {
  const [numero, setNumero] = useState("");
  const [data, setData] = useState(""); // string vazia significa sem data

  async function handleSubmit(event) {
    event.preventDefault();

    if (!numero) {
      alert("O número é obrigatório.");
      return;
    }

    const registro = {
      numero: Number(numero),
      ...(data && { data }),
    };

    try {
      const res = await fetch(`${API_URL}/registros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });

      if (!res.ok) {
        const erro = await res.json();
        alert("Erro: " + erro.erro);
        return;
      }

      const resposta = await res.json();
      alert("Registro salvo com sucesso!");
      setNumero("");
      setData("");
    } catch (error) {
      alert("Erro ao salvar registro: " + error.message);
    }
  }

  return (
    <div className="container">
      <h1>Contador</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Número (obrigatório): <br />
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Data (opcional): <br />
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <button type="submit" className="btn-submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;
