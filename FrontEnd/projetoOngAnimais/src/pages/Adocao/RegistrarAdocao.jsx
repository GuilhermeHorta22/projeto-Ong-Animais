import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Label from '../../components/Label';
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
        <div className="max-w-4xl mx-auto space-y-10 p-6">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCadastrarAdocao(e);
            }}>
                <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                    Registrar Adoção
                </h1>

                {/* aqui eu mostro os animais que pode ser adotado */}
                <div className="space-y-2">
                    {animaisDisponiveis.map(animal => (
                        <label
                        key={animal.id}
                        className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                        >
                            <input
                                type="radio"
                                name="animal"
                                value={animal.id}
                                checked={selectedAnimal?.id === animal.id}
                                onChange={() => setSelectedAnimal(animal)}
                            />
                            <span> {textFormatter(animal.nome)} </span>
                        </label>
                    ))}
                </div>
                
                {/* aqui eu mostro as informações do animal selecionado */}
                {selectedAnimal && (
                    <div className="bg-white shadow rounded-xl p-4 border">
                        <h3 className="font-semibold text-lg">Animal Selecionado</h3>
                        <img 
                            src={`http://localhost:3000/uploads/${selectedAnimal.foto_url}`} 
                            alt={selectedAnimal.nome}
                            className="w-70 h-70 object-cover" 
                        />
                        <p><strong>Nome: </strong> {textFormatter(selectedAnimal.nome)} </p>
                        <p><strong>Espécie: </strong> {textFormatter(selectedAnimal.especie)} </p>
                        <p><strong>Porte: </strong> {textFormatter(selectedAnimal.porte)} </p>
                        <p><strong>Status: </strong>
                            <strong className="text-green-700"> {selectedAnimal.status} </strong>
                        </p>
                    </div>
                )}

                {/* aqui eu mostro os usuarios que pode ser adotado */}
                <div className="space-y-2">
                    {usuariosDisponiveis.map(usuario => (
                        <Label key={usuario.id}
                            className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-200"
                        >
                            <input 
                                type="radio" 
                                name="usuario"
                                value={usuario.id}
                                checked={selectedUsuario?.id === usuario.id}
                                onChange={() => setSelectedUsuario(usuario)}
                            />
                            <span> {textFormatter(usuario.nome)} </span>
                        </Label>
                    ))}
                </div>

                {/* aqui eu mostro as informações do usuario selecionado */}
                {selectedUsuario && (
                    <div className="bg-white shadow rounded-xl p-4 border">
                        <h3 className="font-semibold text-lg">Usuário Selecionado</h3>
                        <p><strong>Nome: </strong> {textFormatter(selectedUsuario.nome)} </p>
                        <p><strong>CPF: </strong> {cpfFormatter(selectedUsuario.cpf)} </p>
                        <p><strong>Telefone: </strong> {telefoneFormatter(selectedUsuario.telefone)} </p>
                        <p><strong>Tipo: </strong> {selectedUsuario.tipo} </p>
                    </div>
                )}

                {/* mensagem de erro ou de sucesso */}
                {error && <p className="text-red-700"> {error} </p>}
                {success && <p className="text-green-700 mb-2"> {success} </p>}

                {/* botão de confirmação da doação */}
                <div className="flex justify-center gap-4 mt-4">
                    <Button 
                        type="submit"
                        disabled={!selectedAnimal || !selectedUsuario}
                        className="bg-green-700 hover:bg-green-800"
                    >finalizar</Button>

                    <Button
                        type="button"
                        className="bg-red-700 hover:bg-red-800"
                        onClick={limparSelecoes}
                    >Cancelar</Button>
                </div>
                
                {/* penso em chamar um modal para confirmar a ciencia da adoção */}
            </form>
        </div>
    );
}

export default RegistrarAdocao;