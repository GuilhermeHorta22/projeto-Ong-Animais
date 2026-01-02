import { useState, useEffect } from "react";
import { Trash, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";
import { textFormatter } from "../../utils/formatters/textFormatter";
import { dataFormatter } from "../../utils/formatters/dataFormatter";
import ModalDelete from "../../components/ModalDelete";
import ModalAdocao from "../../components/ModalAdocao";

function AdocaoRelatorio()
{
    const [adocoes, setAdocoes] = useState([]);
    const [selectedAdocao, setSelectedAdocao] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalAdocaoAberto, setModalAdocaoAberto] = useState(false);
    const [adocaoParaExcluir, setAdocaoParaExcluir] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");

    useEffect(() => {
        if(isAuthorized === true)
        {
            const fetchAdocao = async () => {
                try
                {
                    const response = await fetch('http://localhost:3000/adocoes/', {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    const data = await response.json();
                    if(!response.ok)
                    {
                        setError(data.error || "Erro ao carregar as adoções.");
                        return;
                    }

                    if(Array.isArray(data))
                        setAdocoes(data);
                    else
                        setAdocoes([]);
                }
                catch(err)
                {
                    setError("Erro ao listar adoções: ", err);
                    setAdocoes([]);
                }
            };
            fetchAdocao();
        }
    }, [isAuthorized, token]);

    if(isAuthorized === false)
        return null;

    async function deleteAdocao(adocaoId)
    {
        if(!adocaoId)
        {
            alert("ID da adoção inválido para exclusão.");
            return;
        }

        try
        {
            const response = await fetch(`http://localhost:3000/adocoes/${adocaoId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                const data = await response.json();
                setError(data.message || "Erro ao excluir adoção.");
                return;
            }

            setAdocoes(prevAdocao => prevAdocao.filter(adocao => Number(adocao.id) !== Number(adocaoId)))
            setError("");
        }
        catch(err)
        {
            console.log("Erro ao excluir adoção: ", err);
            setError("Erro de rede ou conexão. Tente novamente.");
        }
        finally
        {
            setModalAberto(false);
            setAdocaoParaExcluir(null);
        }
    }

    return (
        <div className="p-8 bg-slate-300 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Relatório De Adoções
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-900">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Código adoção</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome Animal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome Usuário</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data adoção</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-300">
                        {adocoes.map((adocao) => (
                            <tr key={adocoes.id} className="hover:bg-gray-50">
                                <td className="px-18 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    {adocao.id}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 capitalize">
                                   {textFormatter(adocao.animal?.nome)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 capitalize">
                                    {textFormatter(adocao.usuario?.nome)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    {dataFormatter(adocao.data)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    <button
                                        title="Visualizar detalhes da adoção"
                                        onClick={(event) => { event.stopPropagation(); setSelectedAdocao(adocao); setModalAdocaoAberto(true); }}
                                        className="text-blue-600 hover:text-blue-900 mx-1 px-1"
                                    >
                                        <Eye size={25}/>
                                    </button>

                                    <button
                                        title="Editar adoção"
                                        onClick={() => navigate(`/admin/editar-adocao/${adocao.id}`)}
                                        className="text-yellow-600 hover:text-yellow-900 mx-1 px-1"
                                    >
                                        <Pencil size={25}/>
                                    </button>

                                    <button
                                        title="Excluir adoção"
                                        onClick={(event) => {event.stopPropagation(); setAdocaoParaExcluir(adocao); setModalAberto(true); }}
                                        className="text-red-600 hover:text-red-900 mx-1 px-1"
                                    >
                                        <Trash size={25}/>
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {adocoes.length === 0 && (
                    <p className="p-6 text-center text-gray-500">Nenhuma adoção encontrada.</p>
                )}
            </div>

            <ModalAdocao 
                isOpen={modalAdocaoAberto && !!selectedAdocao}
                itemAdocao={selectedAdocao || "Este item"}
                errorMessage={error}
                onClose={() => setModalAdocaoAberto(false)}
            />

            <ModalDelete 
                isOpen={modalAberto && !!adocaoParaExcluir}
                itemName={"Adoção código " + adocaoParaExcluir?.id}
                errorMessage={error}
                onClose={() => setModalAberto(false)}
                onConfirm={() => deleteAdocao(adocaoParaExcluir?.id)}
            />
        </div>
    );
}

export default AdocaoRelatorio;