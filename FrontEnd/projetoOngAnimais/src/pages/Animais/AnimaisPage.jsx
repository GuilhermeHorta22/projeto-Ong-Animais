import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../validation/useAuthGuard";

function AnimaisPage() 
{
    const [animais, setAnimais] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [animalParaExcluir, setAnimalParaExcluir] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const tipoUsuario = localStorage.getItem("tipo");
    const isAuthorized = useAuthGuard("ADMIN", "ADOTANTE");
    if(isAuthorized === false)
        return null;

    useEffect(() => {
        const fetchAnimais = async () => {
            try 
            {
                const response = await fetch("http://localhost:3000/animais/", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if(!response.ok)
                {
                    setError(data.error || "Erro ao carregar animais.");
                    return;
                }

                if(Array.isArray(data))
                    setAnimais(data);
                else
                    setAnimais([]); //se caso não tiver animais ele deixar um array vazio
            } 
            catch(err) 
            {
                console.log("Erro ao buscar animais:", err);
                setAnimais([]); //para evitar erros se o banco for vazio
            }
        };
        fetchAnimais();
    }, [navigate]);

    async function deleteAnimal(animalId) //tem que ser async para aceitar o await
    {
        if(!animalId)
            return;

        try
        {
            const response = await fetch(`http://localhost:3000/animais/${animalId}`,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                const data = await response.json();
                setError(data.message || "Erro ao deletar o animal.");
                return;
            }

            setAnimais(prevAnimais => prevAnimais.filter(animal => animal.id !== animalId));
            setError("");
        }
        catch(err)
        {
            console.log("Erro ao excluir animal: ", err);
            setError("Erro de rede ou conexão. Tente novamente.");
        }
        finally
        {
            setModalAberto(false);
            setAnimalParaExcluir(null);
        }
    }

    return (
        <div className="p-8 bg-slate-300 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                {tipoUsuario === "ADMIN" ? "Gerenciamento de Animais" : "Animais Disponíveis para Adoção"}
            </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {animais.map((animal) => (
                <div
                    key={animal.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    style={{ minHeight: "430px" }} // garante altura mínima
                >
                    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <img
                            src={`http://localhost:3000/uploads/${animal.foto_url}`}
                            alt={animal.nome}
                            className="w-full h-70 object-cover"
                        />

                        <div className="flex flex-col justify-between flex-grow p-4">
                            <div>
                                {/* titulo e lixeira juntos */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-bold capitalize">{animal.nome}</h2>
                                    {tipoUsuario === "ADMIN" &&(
                                        <>
                                            <button 
                                                className="mt-2 text-red-600 hover:text-red-800" 
                                                onClick={(event) => { event.stopPropagation(); setAnimalParaExcluir(animal); setModalAberto(true); }}>
                                                <TrashIcon/>
                                            </button>
                                        </>
                                    )}
                                    
                                </div>   
                                <p className="text-gray-600">{animal.especie} • {animal.raca}</p>
                                <p className="text-gray-600">Idade: {animal.idade} anos</p>
                                <p className="text-gray-600">Porte: {animal.porte}</p>
                                <p
                                    className={`font-semibold ${
                                    animal.status === 'Disponível' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {animal.status}
                                </p>

                               
                            </div>

                            <div className="mt-4 flex gap-2">
                                {tipoUsuario === "ADMIN" && (
                                    <button 
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                                        onClick={() => navigate(`/admin/editar-animal/${animal.id}`)}>
                                        Editar
                                    </button>
                                )}
                                
                                <button 
                                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-lg transition"
                                    onClick={() => setSelectedAnimal(animal)}>
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* criando meu modal de deletar animal */}
        {modalAberto && animalParaExcluir && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
                    <p className="mb-4 text-lg">
                        Deseja confirmar a exclusão de <strong>{animalParaExcluir.nome}</strong> ?
                    </p>
                    { error && <p className="text-red-500">{error}</p> }

                    <div className="flex justify-center gap-4 py-5">
                        <Button 
                            className="bg-green-700 hover:bg-green-700"
                            onClick={() => deleteAnimal(animalParaExcluir?.id)}
                        > Confirmar</Button>

                        <Button 
                            className="bg-red-800 hover:bg-red-800"
                            onClick={() => setModalAberto(false)}
                        > Cancelar</Button>
                    </div>
                </div>

            </div>
        )}


        {selectedAnimal && (
            <div className="fixed inset-0 bg-slate-300 bg-opacity-60 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
                    <button
                    onClick={() => setSelectedAnimal(null)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl font-bold"
                    >
                    ×
                    </button>

                    <img
                        src={`http://localhost:3000/uploads/${selectedAnimal.foto_url}`}
                        alt={selectedAnimal.nome}
                        className="w-[400px] h-[400px] object-cover rounded-xl shadow-lg mx-auto"
                    />

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedAnimal.nome}</h2>
                    <p className="text-slate-600"><strong>Espécie:</strong> {selectedAnimal.especie}</p>
                    <p className="text-slate-600"><strong>Raça:</strong> {selectedAnimal.raca}</p>
                    <p className="text-slate-600"><strong>Idade:</strong> {selectedAnimal.idade} anos</p>
                    <p className="text-slate-600"><strong>Porte:</strong> {selectedAnimal.porte}</p>
                    <p className="text-slate-600"><strong>Status:</strong> {selectedAnimal.status}</p>
                    <p className="text-slate-600 mt-2"><strong>Descrição:</strong> {selectedAnimal.descricao}</p>
                </div>
            </div>
        )}
        </div>
    );
}

export default AnimaisPage;