import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";
import { textFormatter } from "../../utils/formatters/textFormatter";
import { telefoneFormatter } from "../../utils/formatters/telefoneFormatter";
import { cpfFormatter } from "../../utils/formatters/cpfFormatter";
import Button from "../../components/Button";

function EditarAdocao() 
{
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {id} = useParams();
    const [adocao, setAdocao] = useState({
        id_animal: 0,
        id_usuario: 0,
        data_adocao: ""
    });
    const [usuarios, setUsuarios] = useState([]);
    const [animais, setAnimais] = useState([]);
    const [idAnimal, setIdAnimal] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");

    //vamos recuperar os dados da adoção
    useEffect(() => {
        if(isAuthorized === true && id)
        {
            const fetchAdocao = async () => {
                try
                {
                    const response = await fetch(`http://localhost:3000/adocoes/${id}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setAdocao(data);
                    setIdAnimal(data.id_animal);
                }
                catch(err)
                {
                    console.log("Erro ao buscar a adoção: ", err);
                    setError("Erro ao buscar adoção.");
                }
            };
            fetchAdocao();
        }
    }, [isAuthorized, id, token]);

    //trazer os dados do usuario
    useEffect(() => {
        if(isAuthorized === true)
        {
            const fetchUsuarios = async () => {
                try
                {
                    const response = await fetch('http://localhost:3000/usuarios/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
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
                    setError("Erro ao listar Usuários: ",err);
                    setUsuarios([]);
                }
            };
            fetchUsuarios();
        }
    }, [isAuthorized, token]);

    const usuariosDisponiveis = usuarios.filter(
        usuario => usuario.tipo === "ADOTANTE"
    );

    //trazer os dados do animal
    useEffect(() => {
        if(isAuthorized === true)
        {
            const fetchAnimais = async () => {
                try
                {
                    const response = await fetch('http://localhost:3000/animais/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
                        }
                    });

                    const data = await response.json();
                    if(!response.ok)
                    {
                        setError(data.error || "Erro ao carregar os animais.");
                        return;
                    }

                    if(Array.isArray(data))
                        setAnimais(data);
                    else
                        setAnimais([]);
                }
                catch(err)
                {
                    setError("Erro ao carregar os animais: ", err);
                    setAnimais([]);
                }
            }
            fetchAnimais();
        }
    }, [isAuthorized, token]);

    const animaisDisponiveis = animais.filter(
        animal => animal.status === "Disponível" || animal.id === idAnimal
    )

    if(isAuthorized === false)
        return null;

    //vamos pegar as alterações
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setAdocao((prev) => ({
            ...prev,
            [name]: name === "id_animal" || name === "id_usuario"
                ? Number(value) : value
            }));
    }

    //vamos realizar o update das informações
    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const response = await fetch(`http://localhost:3000/adocoes/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(adocao)
            });

            const data = await response.json();
            if(!response.ok)
            {
                setError(data.error || "Erro ao atualizar dados da adoção.");
                return;
            }

            setSuccess("Dados da adoção atualizado com sucesso.");
            setTimeout(() => navigate("/admin/relatorio-adocao"), 2500);
        }
        catch(err)
        {
            console.log("Erro ao alterar dados da adoção: ", err);
            setError("Erro de conexão com o servidor.");
        }
    }

    const animalSelecionado = animais.find(
        animal => animal.id === adocao.id_animal
    );

    const usuarioSelecionado = usuarios.find(
        usuario => usuario.id === adocao.id_usuario
    )

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl border-2 p-8 space-y-10 border-slate-800"
            >
                <h1 className="text-3xl font-bold text-slate-800 text-center">
                    Editar adoção
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 text-center">
                            Animais para Adoção
                        </h2>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {animaisDisponiveis.map(animal => (
                                <label 
                                    key={animal.id}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition text-slate-800
                                        ${adocao?.id_animal === animal.id
                                            ? 'bg-green-50 border-green-600'
                                            : 'hover:bg-slate-50 border-slate-800'}`}
                                >
                                    <input 
                                        type="radio" 
                                        name="id_animal"
                                        value={animal.id}
                                        checked={adocao?.id_animal === animal.id}
                                        onChange={handleChange}
                                    />
                                    <span className="font-medium">
                                        {textFormatter(animal.nome)}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {animalSelecionado && (
                            <div className="border rounded-xl p-4 bg-slate-50 space-y-3">
                                <img 
                                    src={`http://localhost:3000/uploads/${animalSelecionado.foto_url}`}
                                    alt={animalSelecionado.nome}
                                    className="w-80 h-80 object-cover rounded-xl shadow mx-auto"
                                />

                                <p className="text-slate-800 text-lg"><strong>Nome:</strong> {textFormatter(animalSelecionado.nome)}</p>
                                <p className="text-slate-800 text-lg"><strong>Espécie:</strong> {textFormatter(animalSelecionado.especie)}</p>
                                <p className="text-slate-800 text-lg"><strong>Porte:</strong> {textFormatter(animalSelecionado.porte)}</p>
                                <p className="text-slate-800 text-lg">
                                    <strong>Status:</strong>{' '}
                                    <span className={animalSelecionado.status === "Disponível" 
                                        ? "text-green-600 font-semibold"
                                        : "text-yellow-500 font-semibold"
                                    }>
                                        { textFormatter(animalSelecionado.status) }
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* aqui eu vou colocar os adotantes cadastrado */}
                    <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-800 text-center">
                                Adotantes cadastrados
                            </h2>

                            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                {usuariosDisponiveis.map(usuario => (
                                    <label
                                        key={usuario.id}
                                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition text-slate-800
                                            ${adocao?.id_usuario === usuario.id
                                                ? 'bg-blue-50 border-blue-600'
                                                : 'hover:bg-slate-50 border-slate-800'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="id_usuario"
                                            value={usuario.id}
                                            checked={adocao?.id_usuario === usuario.id}
                                            onChange={handleChange}
                                        />
                                        <span className="font-medium">
                                            {textFormatter(usuario.nome)}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {usuarioSelecionado && (
                                <div className="border rounded-xl p-4 bg-slate-50 space-y-2">
                                    <p className="text-slate-800 text-lg"><strong>Nome: </strong> {textFormatter(usuarioSelecionado.nome)} </p>
                                    <p className="text-slate-800 text-lg"><strong>CPF: </strong> {cpfFormatter(usuarioSelecionado.cpf)} </p>
                                    <p className="text-slate-800 text-lg"><strong>Telefone: </strong> {telefoneFormatter(usuarioSelecionado.telefone)} </p>
                                    <p className="text-slate-800 text-lg"><strong>Tipo: </strong> {textFormatter(usuarioSelecionado.tipo)} </p>
                                </div>
                            )}
                        </div>
            </div>

                {error && <p className="text-red-700 text-center">{error}</p>}
                {success && <p className="text-green-700 text-center">{success}</p>}

                <div className="flex justify-center gap-6 pt-4">
                    <Button
                        onClick={handleSubmit}
                        className="bg-green-700 hover:bg-green-800"
                    >
                        Confirmar
                    </Button>

                    <Button
                        onClick={() => navigate("/admin/relatorio-adocao")}
                        className="bg-red-700 hover:bg-red-800"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditarAdocao;