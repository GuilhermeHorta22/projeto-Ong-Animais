import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAuthGuard } from '../../utils/validation/useAuthGuard';
import { textFormatter } from '../../utils/formatters/textFormatter';
import { telefoneFormatter } from '../../utils/formatters/telefoneFormatter';
import { cpfFormatter } from '../../utils/formatters/cpfFormatter';
import { useNavigate } from 'react-router-dom';

function RegistrarAdocao()
{
    const navigate = useNavigate();

    const [animais, setAnimais] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    //colocar validação de token de admin
    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");

    //fazer metodo get para trazer os usuarios
    useEffect(() => {
        if(isAuthorized === true)
        {
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
        }
    }, [isAuthorized, token]);

    //guardando apenas os usuarios que são adotantes
    const usuariosDisponiveis = usuarios.filter(
        usuario => usuario.tipo === "ADOTANTE"
    );

    //fazer metodo get para trazer os animais
    useEffect(() => {
        if(isAuthorized === true)
        {
            const fetchAnimais = async () => {
                try
                {
                    const response = await fetch('http://localhost:3000/animais/', {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    const data = await response.json();
                    if(!response.ok)
                    {
                        setError(data.error || "Erro ao listar os animais.");
                        return;
                    }

                    if(Array.isArray(data))
                        setAnimais(data);
                    else
                        setAnimais([]);
                }
                catch(err)
                {
                    setError("Erro ao listar Animais: ", err);
                    setAnimais([]);
                }
            };
            fetchAnimais();
        }
    }, [isAuthorized, token]);

    //guardando apenas os animais com o status disponivel
    const animaisDisponiveis = animais.filter(
        animal => animal.status === "Disponível"
    );

    //validacao do token
    if(isAuthorized === false)
        return null;

    //fazer metodo que realiza a adoção
    const handleCadastrarAdocao = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const id_animal = selectedAnimal.id;
        const id_usuario = selectedUsuario.id;

        if(!selectedAnimal || !selectedUsuario)
        {
            setError("Preencha todos os campos.");
            return;
        }
            
        try
        {
            const response = await fetch("http://localhost:3000/adocoes", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_animal, id_usuario })
            });

            const data = await response.json();
            if(!response.ok)
            {
                setError(data.error || "Erro ao registrar adoção.");
                return;
            }

            setSuccess("Adoção realizada com sucesso!");
            setTimeout(() => navigate("/admin", 2500));
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com servidor.");
        }
    }

    //metodo que limpa o animal e pessoa selecionado
    function limparSelecoes() {
        setSelectedAnimal(null);
        setSelectedUsuario(null);
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCadastrarAdocao(e);
                }}
                className="bg-white rounded-xl shadow-xl border-2 p-8 space-y-10 border-slate-800"
            >
                <h1 className="text-3xl font-bold text-slate-800 text-center">
                    Registrar Adoção
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
                                    ${selectedAnimal?.id === animal.id
                                        ? 'bg-green-50 border-green-600'
                                        : 'hover:bg-slate-50 border-slate-800'}`}
                                >
                                    <input
                                        type="radio"
                                        name="animal"
                                        checked={selectedAnimal?.id === animal.id}
                                        onChange={() => setSelectedAnimal(animal)}
                                    />
                                    <span className="font-medium">
                                        {textFormatter(animal.nome)}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {selectedAnimal && (
                            <div className="border rounded-xl p-4 bg-slate-50 space-y-3">
                                <img
                                    src={`http://localhost:3000/uploads/${selectedAnimal.foto_url}`}
                                    alt={selectedAnimal.nome}
                                    className="w-80 h-80 object-cover rounded-xl shadow mx-auto"
                                />

                                <p className="text-slate-800 text-lg"><strong>Nome:</strong> {textFormatter(selectedAnimal.nome)}</p>
                                <p className="text-slate-800 text-lg"><strong>Espécie:</strong> {textFormatter(selectedAnimal.especie)}</p>
                                <p className="text-slate-800 text-lg"><strong>Porte:</strong> {textFormatter(selectedAnimal.porte)}</p>
                                <p className="text-slate-800 text-lg">
                                    <strong>Status:</strong>{' '}
                                    <span className="text-green-600 font-semibold">
                                        {textFormatter(selectedAnimal.status)}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 text-center">
                            Adotantes Cadastrados
                        </h2>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {usuariosDisponiveis.map(usuario => (
                                <label
                                    key={usuario.id}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition text-slate-800
                                    ${selectedUsuario?.id === usuario.id
                                        ? 'bg-blue-50 border-blue-600'
                                        : 'hover:bg-slate-50 border-slate-800'}`}
                                >
                                    <input
                                        type="radio"
                                        name="usuario"
                                        checked={selectedUsuario?.id === usuario.id}
                                        onChange={() => setSelectedUsuario(usuario)}
                                    />
                                    <span className="font-medium">
                                        {textFormatter(usuario.nome)}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {selectedUsuario && (
                            <div className="border rounded-xl p-4 bg-slate-50 space-y-2">
                                <p className="text-slate-800 text-lg"><strong>Nome:</strong> {textFormatter(selectedUsuario.nome)}</p>
                                <p className="text-slate-800 text-lg"><strong>CPF:</strong> {cpfFormatter(selectedUsuario.cpf)}</p>
                                <p className="text-slate-800 text-lg"><strong>Telefone:</strong> {telefoneFormatter(selectedUsuario.telefone)}</p>
                                <p className="text-slate-800 text-lg"><strong>Tipo:</strong> {selectedUsuario.tipo}</p>
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-700 text-center">{error}</p>}
                {success && <p className="text-green-700 text-center">{success}</p>}

                <div className="flex justify-center gap-6 pt-4">
                    <Button 
                        type="submit"
                        disabled={!selectedAnimal || !selectedUsuario}
                        className="bg-green-700 hover:bg-green-800"
                    >
                        Confirmar
                    </Button>

                    <Button
                        type="button"
                        onClick={limparSelecoes}
                        className="bg-red-700 hover:bg-red-800 px-8"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );

}

export default RegistrarAdocao;