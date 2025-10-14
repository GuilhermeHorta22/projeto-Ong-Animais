import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Edit, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AnimaisPage({ modo = "adotante" }) 
{
    const [animais, setAnimais] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimais = async () => {
            try 
            {
                const response = await fetch("http://localhost:3000/animais/");
                const data = await response.json();
                setAnimais(data);
            } 
            catch(err) 
            {
                console.log("Erro ao buscar animais:", err);
            }
        };
        fetchAnimais();
    }, []);

    return (
        <div className="p-8 bg-stone-100 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                {modo === "admin" ? "Gerenciamento de Animais" : "Animais Disponíveis para Adoção"}
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
                            className="w-full h-56 object-cover"
                        />

                        <div className="flex flex-col justify-between flex-grow p-4">
                            <div>
                                <h2 className="text-lg font-bold capitalize">{animal.nome}</h2>
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
                                <button 
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                                    onClick={() => navigate(`/admin/editar-animal/${animal.id}`)}>
                                    Editar
                                </button>
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


        {selectedAnimal && (
            <div className="fixed inset-0 bg-stone-300 bg-opacity-60 flex justify-center items-center z-50">
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
                        className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
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