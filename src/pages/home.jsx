import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";
import API_URL from "../services/api";

function Home() {
  const [totalManual, setTotalManual] = useState("");
  const [valorUber, setValorUber] = useState("");
  const [valor99, setValor99] = useState("");
  const [data, setData] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      totalManual.trim() === "" &&
      (valorUber.trim() === "" && valor99.trim() === "")
    ) {
      alert("Informe um valor válido.");
      return;
    }

    const registro = totalManual.trim() !== ""
      ? { manual: totalManual, data }
      : { uber: valorUber, noveNove: valor99, data };

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

      alert("Registro salvo com sucesso!");
      setTotalManual("");
      setValorUber("");
      setValor99("");
      setData("");
    } catch (error) {
      alert("Erro ao salvar registro: " + error.message);
    }
  }

  const manualPreenchido = totalManual.trim() !== "";

  return (
    <div className="container">
      <h1>Contador</h1>

      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/contagem">Ver Contagem</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Valor total manual (opcional): <br />
            <input
              type="number"
              value={totalManual}
              onChange={(e) => setTotalManual(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Valor Uber: <br />
            <input
              type="number"
              value={valorUber}
              onChange={(e) => setValorUber(e.target.value)}
              className="input-field"
              disabled={manualPreenchido}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Valor 99: <br />
            <input
              type="number"
              value={valor99}
              onChange={(e) => setValor99(e.target.value)}
              className="input-field"
              disabled={manualPreenchido}
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

export default Home;


//tes