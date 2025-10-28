import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Trash, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  { useAuthGuard } from "../../utils/validation/useAuthGuard";
import EditarUsuario from "./EditarUsuario";
import ModalDelete from "../../components/ModalDelete";
import { cpfFormatter } from "../../utils/formatters/cpfFormatter";
import { telefoneFormatter } from "../../utils/formatters/telefoneFormatter";

function UsuariosRelatorio()
{
    const [usuarios, setUsuarios] = useState([]); //vamos usar para listar os usuarios
    const [selectedUsuario, setSelectedUsuario] = useState(null); //vamos usar para editar
    const [modalAberto, setModalAberto] = useState(false); //vamos usar para ter controle do modal de exclusao
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //validacao de token
    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");
    if(isAuthorized === false)
        return null;

    useEffect(() => {
        const fetchUsuarios = async () => {
            try
            {
                const response = await fetch('http://localhost:3000/usuarios/', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if(!response.ok)
                {
                    setError(data.error || "Erro ao carregar os usuários.");
                    return;
                }

                if(Array.isArray(data))
                    setUsuarios(data);
                else
                    setUsuarios([]);
            }
            catch(err)
            {
                setError("Erro ao listar Usuários: ", err);
                setUsuarios([]);
            }
        };
        fetchUsuarios();
    }, [navigate]);

    async function deleteUsuario(usuarioId)
    {
        if(!usuarioId)
        {
            alert("ID do usuário inválido para exclusão.");
            return; 
        }
            
        try
        {
            const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                const data = await response.json();
                setError(data.message || "Erro ao excluir usuário.");
                return;  
            }

            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => Number(usuario.id) != Number(usuarioId)));
            setError("");
        }
        catch(err)
        {
            console.log("Erro ao excluir usuário: ", err);
            setError("Erro de rede ou conexão. Tente novamente.");
        }
        finally
        {
            setModalAberto(false);
            setUsuarioParaExcluir(null);
        }
    }

    return(
        <div className="p-8 bg-slate-300 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Relatório De Usuários
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-900">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CPF</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-300">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 capitalize">
                                    {usuario.nome}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cpfFormatter(usuario.cpf)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {telefoneFormatter(usuario.telefone)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                    {usuario.tipo === "ADMIN" ? "Administrador" : "Adotante"}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    <button
                                        title="Visualizar detalhes do usuário"
                                        onClick={() => setSelectedUsuario()}
                                        className="text-blue-600 hover:text-blue-900 mx-1 px-1"
                                    >
                                        <Eye size={25} />
                                    </button>

                                    <button
                                        title="Editar usuário"
                                        onClick={() => navigate(`/admin/editar-usuario/${usuario.id}`)}
                                        className="text-yellow-600 hover:text-yellow-900 mx-1 px-1"
                                    >
                                        <Pencil size={25} />
                                    </button>

                                    <button 
                                        title="Excluir usuário"
                                        onClick={(event) => { event.stopPropagation(); setUsuarioParaExcluir(usuario); setModalAberto(true);} }
                                        className="text-red-600 hover:text-red-900 mx-1 px-1"
                                    >
                                        <Trash size={25} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {usuarios.length === 0 && (
                    <p className="p-6 text-center text-gray-500">Nenhum usuário encontrado.</p>
                )}
            </div>

            {/* aqui eu vou adicionar meu modal para exclusão e detalhes do usuario */}
            <ModalDelete 
                isOpen={modalAberto && !!usuarioParaExcluir}
                itemName={usuarioParaExcluir?.nome || "Este item"}
                errorMessage={error}
                onClose={() => setModalAberto(false)}
                onConfirm={() => deleteUsuario(usuarioParaExcluir?.id)}
            />

        </div>
    );
}

export default UsuariosRelatorio;