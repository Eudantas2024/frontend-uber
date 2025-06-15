import { useState } from 'react';
import './App.css';

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
      // Envia a data só se estiver preenchida, senão omite
      ...(data && { data }),
    };

    try {
      const res = await fetch("http://localhost:3000/api/registros", {
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
      setData(""); // limpa campo data após envio
    } catch (error) {
      alert("Erro ao salvar registro: " + error.message);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Contador</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Número (obrigatório): <br />
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Data (opcional): <br />
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;
