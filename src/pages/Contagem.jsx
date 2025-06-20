import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";
import "./Contagem.css"; // ✅ Importação do CSS separado

function Contagem() {
    const [registros, setRegistros] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function fetchRegistros() {
            try {
                const res = await fetch(`${API_URL}/registros`);
                const data = await res.json();
                setRegistros(data);
            } catch (e) {
                setErro("Erro ao buscar registros.");
            } finally {
                setLoading(false);
            }
        }
        fetchRegistros();
    }, []);

    function toggleSelecionado(id) {
        setSelecionados((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    async function excluirSelecionados() {
        if (selecionados.length === 0) return alert("Nenhum registro selecionado.");
        const confirmar = confirm("Deseja realmente excluir os registros selecionados?");
        if (!confirmar) return;

        try {
            for (const id of selecionados) {
                const res = await fetch(`${API_URL}/registros/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error(`Erro ao excluir registro ${id}`);
            }

            setRegistros((prev) => prev.filter((r) => !selecionados.includes(r._id)));
            setSelecionados([]);
        } catch (e) {
            alert("Erro ao excluir registros: " + e.message);
        }
    }

    const somaTotal = registros.reduce((acc, r) => acc + (r.numero || 0), 0);

    if (loading) return <p>Carregando...</p>;
    if (erro) return <p>{erro}</p>;

    return (
        <div className="container">
            <h1>Contagem de Registros</h1>

            <button
                onClick={excluirSelecionados}
                disabled={selecionados.length === 0}
            >
                Excluir Selecionados
            </button>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Data</th>
                        <th>Manual</th>
                        <th>Uber</th>
                        <th>99</th>
                        <th>Total dia</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                        <tr key={registro._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selecionados.includes(registro._id)}
                                    onChange={() => toggleSelecionado(registro._id)}
                                />
                            </td>
                            <td>
                                {registro.data
                                    ? new Date(registro.data).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td>{registro.manual != null ? registro.manual : 0}</td>
                            <td>{registro.uber != null ? registro.uber : 0}</td>
                            <td>{registro.noveNove != null ? registro.noveNove : 0}</td>
                            <td>{registro.numero}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">Total</td>
                        <td>{somaTotal.toFixed(2)}</td>  {/* Aqui */}
                    </tr>
                </tfoot>
            </table>

            <Link to="/">← Voltar para o formulário</Link>
        </div>
    );
}

export default Contagem;
